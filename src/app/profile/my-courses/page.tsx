import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/api';

// TODO: Thay thế bằng API lấy khóa học của user
async function MyCoursesPage() {
  // Hiện tại, chúng ta sẽ lấy một vài khóa học để hiển thị làm ví dụ
  const enrolledCourses = await getProducts({ per_page: 3 });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-cap-dark-blue">Khóa học của tôi</h1>
      {enrolledCourses.length > 0 ? (
        <ProductGrid products={enrolledCourses} />
      ) : (
        <p className="text-gray-500">Bạn chưa đăng ký khóa học nào.</p>
      )}
    </div>
  );
}

export default MyCoursesPage;