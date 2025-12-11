import { Product, Category, PaymentGateway } from './types';

// --- Constants & Config ---
// Sử dụng URL và Auth Header trực tiếp từ thử nghiệm thành công của bạn
const TUTOR_API_URL = "https://course.learnwithcap.com/wp-json/tutor/v1/courses";
// Header này giải mã ra key/secret bạn đã cung cấp
const AUTH_HEADER = "Basic a2V5XzkxZGFhNTIyZjU1ZjZiNDFiYzdlZmE3Mzk1MWY4ZDU2OnNlY3JldF9lNjJmYTc2MDNlNjFhN2ZkM2YyZWQ1NWJmZjdkNDExZmUxZmE2MzU5MWNlY2ZmZWFlYjU1ZDg5NDkwYzk1MzEy";

// Sử dụng biến môi trường phía máy chủ cho WooCommerce
const WC_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_SECRET;

// --- Helper for Auth (WooCommerce only) ---
const createWcAuthHeader = (key: string | undefined, secret: string | undefined) => {
  if (!key || !secret) return '';
  return 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');
};

// --- Fetchers ---

async function fetchTutorLMS(params: string) {
  try {
    // Kết hợp URL gốc với params (ví dụ: ?page=1&per_page=20)
    const url = `${TUTOR_API_URL}${params}`;

    const res = await fetch(url, {
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      // Revalidate mỗi 60 giây để dữ liệu không bị cache quá lâu
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Tutor LMS Error: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Tutor LMS Fetch Error:", error);
    return null;
  }
}

async function fetchWooCommerce(endpoint: string) {
  if (!WC_URL || !WC_KEY || !WC_SECRET) return null;

  try {
    const res = await fetch(`${WC_URL}${endpoint}`, {
      headers: {
        'Authorization': createWcAuthHeader(WC_KEY, WC_SECRET),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("WooCommerce Fetch Error:", error);
    return null;
  }
}

// --- Mappers ---
export function mapCourseToProduct(course: any): Product {
  // Logic xác định giá:
  // 1. Nếu không có giá (undefined/null) -> Free
  // 2. Nếu giá = 0 -> Free
  // 3. Nếu price_type = 'free' -> Free

  let isFree = false;
  // API /my-courses trả về giá trong `course_price`
  const rawPrice = course.price ? parseFloat(course.price) : (course.course_price ? parseFloat(course.course_price) : 0);

  if (!course.price && !course.course_price || rawPrice === 0 || course.price_type === 'free') {
    isFree = true;
  }

  const price = isFree ? "0" : String(rawPrice);
  const regularPrice = course.regular_price ? String(course.regular_price) : "";
  const salePrice = course.sale_price ? String(course.sale_price) : "";

  let priceHtml = "";
  if (isFree) {
    priceHtml = `<span class="price-amount font-bold text-green-600">Miễn phí</span>`;
  } else if (salePrice && parseFloat(salePrice) < parseFloat(price)) {
    priceHtml = `<del aria-hidden="true" class="text-gray-400 text-sm">${new Intl.NumberFormat('vi-VN').format(parseFloat(regularPrice || price))} đ</del> <ins class="price-amount font-bold text-cap-dark-blue no-underline ml-2">${new Intl.NumberFormat('vi-VN').format(parseFloat(salePrice))} đ</ins>`;
  } else {
    priceHtml = `<span class="price-amount font-bold text-cap-dark-blue">${new Intl.NumberFormat('vi-VN').format(parseFloat(price))} đ</span>`;
  }

  // --- Extract Duration ---
  let duration = "N/A";
  let hours = 0;
  let minutes = 0;

  // Ưu tiên lấy từ additional_info nếu có
  const durationInfo = course.additional_info?.course_duration;

  if (Array.isArray(durationInfo) && durationInfo[0]) {
    hours = parseInt(durationInfo[0].hours) || 0;
    minutes = parseInt(durationInfo[0].minutes) || 0;
  } else if (durationInfo && typeof durationInfo === 'object') {
    hours = parseInt(durationInfo.hours) || 0;
    minutes = parseInt(durationInfo.minutes) || 0;
  }
  // Fallback sang root level duration
  else if (course.duration) {
    if (typeof course.duration === 'string') {
      const parts = course.duration.split(':');
      if (parts.length >= 2) {
        hours = parseInt(parts[0]) || 0;
        minutes = parseInt(parts[1]) || 0;
      }
    } else if (typeof course.duration === 'object') {
      hours = parseInt(course.duration.hours) || 0;
      minutes = parseInt(course.duration.minutes) || 0;
    }
  }

  if (hours > 0 || minutes > 0) {
    const hStr = hours > 0 ? `${hours} giờ` : '';
    const mStr = minutes > 0 ? `${minutes} phút` : '';
    duration = `${hStr} ${mStr}`.trim();
  } else {
    // Fallback text nếu không có thời lượng
    duration = "Tự linh động";
  }

  // Extract Level
  // Tutor API thường trả về: 'beginner', 'intermediate', 'expert', 'all_levels'
  const rawLevel = course.course_level || course.additional_info?.course_level?.[0] || "all_levels";
  const levelMap: Record<string, string> = {
    'beginner': 'Tiêu chuẩn',
    'intermediate': 'Mở rộng',
    'expert': 'Nâng cao',
    'advanced': 'Nâng cao',
    'all_levels': 'Tất cả trình độ'
  };
  const level = levelMap[rawLevel.toLowerCase()] || 'Mọi cấp độ';

  // Instructor & Rating
  const instructor = course.post_author?.display_name || "CAP English";
  // Rating trong Tutor API đôi khi nằm ở course.ratings.rating_avg hoặc course.rating_avg
  const rating = Math.round(parseFloat(course.ratings?.rating_avg || course.rating_avg || 0));

  // --- Image Handling ---
  const DEFAULT_IMAGE = "https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png";
  // API /my-courses trả về ảnh trong `course_thumbnail`
  const imageSrc = course.featured_image_url || course.thumbnail_url || course.course_thumbnail || DEFAULT_IMAGE;

  // --- New Data Extraction ---
  const totalEnrolled = course.total_enrolled || 0;

  const benefits = course.additional_info?.what_you_will_learn
    ?.map((item: any) => item.title)
    .filter(Boolean) || [];

  const requirements = course.additional_info?.requirements
    ?.map((item: any) => item.title)
    .filter(Boolean) || [];

  const curriculum = course.topics?.map((topic: any) => ({
    title: topic.topic_title,
    lessons: topic.lessons?.map((lesson: any) => ({
      title: lesson.post_title,
    })) || [],
  })) || [];

  return {
    id: course.ID || course.id || Math.random(),
    name: course.post_title || course.title || "Khóa học chưa đặt tên",
    slug: course.post_name || course.slug,
    permalink: course.guid || course.permalink,
    description: course.post_content || course.content || "",
    short_description: course.post_excerpt || course.excerpt || "",
    sku: `COURSE-${course.ID}`,
    price: isFree ? "0" : (salePrice || price),
    regular_price: regularPrice,
    sale_price: salePrice,
    on_sale: !!salePrice && !isFree,
    discountedPrice: salePrice ? `${new Intl.NumberFormat('vi-VN').format(parseFloat(salePrice))} đ` : undefined,
    price_html: priceHtml,
    images: [
      {
        id: 1,
        src: imageSrc,
        alt: course.post_title || "Course Image",
      }
    ],
    categories: course.course_category?.map((cat: any) => ({
      id: cat.term_id || Math.random(),
      name: cat.name,
      slug: cat.slug
    })) || [{ id: 1, name: "Khóa học", slug: "khoa-hoc" }],

    level,
    duration,
    instructor,
    rating,
    tags: course.course_tag?.map((tag: any) => tag.name) || [],
    totalEnrolled,
    benefits,
    requirements,
    curriculum,
  };
}

// --- Public API Functions ---

export async function getProducts(options?: { page?: number; per_page?: number }): Promise<Product[]> {
  const page = options?.page || 1;
  const per_page = options?.per_page || 20; // Default tăng lên 20

  // Gọi API Tutor LMS
  const response = await fetchTutorLMS(`?page=${page}&per_page=${per_page}`);

  // Xử lý các format trả về khác nhau của Tutor LMS
  if (response) {
    if (response.data && Array.isArray(response.data.posts)) {
      return response.data.posts.map(mapCourseToProduct);
    }
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(mapCourseToProduct);
    }
    if (Array.isArray(response)) {
      return response.map(mapCourseToProduct);
    }
  }

  // Fallback nếu Tutor API lỗi hoặc rỗng
  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Fetch danh sách lớn để tìm (do API get-by-slug đôi khi hạn chế)
  const products = await getProducts({ per_page: 50 });
  return products.find(p => p.slug === slug) || null;
}

export async function getCategories(): Promise<Category[]> {
  return [
    { id: 1, name: "Giao tiếp", slug: "giao-tiep", count: 5 },
    { id: 2, name: "Đi làm", slug: "di-lam", count: 3 },
    { id: 3, name: "Cơ bản", slug: "co-ban", count: 4 },
    { id: 4, name: "Khóa học", slug: "khoa-hoc", count: 10 },
  ];
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await getProducts({ per_page: 50 });
  const catIdNum = parseInt(categoryId);
  if (isNaN(catIdNum)) return products;
  return products.filter(p => p.categories.some(c => c.id === catIdNum));
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await getCategories();
  const catId = parseInt(id);
  return categories.find(c => c.id === catId) || null;
}

export async function getPaymentGateways(): Promise<PaymentGateway[]> {
  // Simulate API call
  return Promise.resolve([
    { id: 'bacs', title: 'Chuyển khoản ngân hàng', description: 'Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.', enabled: true }
  ]);
}

export async function getOrderById(id: string) {
  return await fetchWooCommerce(`/wp-json/wc/v3/orders/${id}`);
}

export async function getRelatedProducts(currentProduct: Product): Promise<Product[]> {
  if (!currentProduct.categories || currentProduct.categories.length === 0) {
    return [];
  }

  const allProducts = await getProducts({ per_page: 50 });
  const currentProductCategoryIds = new Set(currentProduct.categories.map(c => c.id));

  const related = allProducts.filter(product => {
    // Exclude the current product itself
    if (product.id === currentProduct.id) {
      return false;
    }
    // Check if the product shares at least one category
    return product.categories.some(cat => currentProductCategoryIds.has(cat.id));
  });

  // Return up to 4 related products
  return related.slice(0, 4);
}