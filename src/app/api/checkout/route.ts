import { NextResponse } from 'next/server';
import { CartItem } from '@/store/cart';

// Sử dụng biến môi trường phía máy chủ (an toàn hơn)
const API_URL = process.env.WOOCOMMERCE_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_SECRET;

export async function POST(req: Request) {
  // Di chuyển logic kiểm tra và xác thực vào đây
  if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error("WooCommerce API credentials are not configured in .env.local");
    return NextResponse.json({ message: 'Lỗi cấu hình máy chủ: Thiếu thông tin API.' }, { status: 500 });
  }

  const auth = 'Basic ' + Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

  try {
    const { billingDetails, items, paymentMethodId, paymentMethodTitle } = await req.json();

    if (!billingDetails || !items || items.length === 0 || !paymentMethodId || !paymentMethodTitle) {
      return NextResponse.json({ message: 'Thiếu dữ liệu thanh toán cần thiết.' }, { status: 400 });
    }

    const line_items = items.map((item: CartItem) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: paymentMethodId,
      payment_method_title: paymentMethodTitle,
      set_paid: false,
      billing: {
        first_name: billingDetails.firstName,
        last_name: billingDetails.lastName,
        address_1: billingDetails.address || '',
        city: billingDetails.city || '',
        state: billingDetails.state || '',
        postcode: billingDetails.zip || '',
        country: 'US', // Mặc định là US, có thể thay đổi sau
        email: billingDetails.email,
        phone: billingDetails.phone || '',
      },
      shipping: { // Giả định địa chỉ giao hàng giống địa chỉ thanh toán
        first_name: billingDetails.firstName,
        last_name: billingDetails.lastName,
        address_1: billingDetails.address || '',
        city: billingDetails.city || '',
        state: billingDetails.state || '',
        postcode: billingDetails.zip || '',
        country: 'US',
      },
      line_items: line_items,
    };

    const response = await fetch(`${API_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Lỗi từ WooCommerce API:', responseData);
      return NextResponse.json({ message: responseData.message || 'Không thể tạo đơn hàng.' }, { status: response.status });
    }

    return NextResponse.json({ success: true, order: responseData }, { status: 201 });

  } catch (error) {
    console.error('Lỗi máy chủ nội bộ:', error);
    return NextResponse.json({ message: 'Đã xảy ra lỗi không mong muốn.' }, { status: 500 });
  }
}