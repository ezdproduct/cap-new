import { NextResponse } from 'next/server';
import { CartItem } from '@/store/cart';

const API_URL = process.env.WOOCOMMERCE_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_SECRET;

const auth = 'Basic ' + Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

// Helper function to generate a random password
const generateRandomPassword = (length = 12) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export async function POST(req: Request) {
  if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    return NextResponse.json({ message: 'Lỗi cấu hình máy chủ.' }, { status: 500 });
  }

  try {
    const { billingDetails, items, paymentMethodId, paymentMethodTitle } = await req.json();

    if (!billingDetails || !items || items.length === 0 || !paymentMethodId || !paymentMethodTitle) {
      return NextResponse.json({ message: 'Thiếu dữ liệu thanh toán.' }, { status: 400 });
    }

    // --- 1. Create Order ---
    const orderData = {
      payment_method: paymentMethodId,
      payment_method_title: paymentMethodTitle,
      set_paid: false,
      billing: {
        first_name: billingDetails.firstName,
        last_name: billingDetails.lastName,
        email: billingDetails.email,
        phone: billingDetails.phone || '',
      },
      line_items: items.map((item: CartItem) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    const orderResponse = await fetch(`${API_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: { 'Authorization': auth, 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const orderResult = await orderResponse.json();
    if (!orderResponse.ok) {
      return NextResponse.json({ message: orderResult.message || 'Không thể tạo đơn hàng.' }, { status: orderResponse.status });
    }

    // --- 2. Handle User Registration & Login ---
    let jwtToken = null;
    const userEmail = billingDetails.email;

    // Check if user exists
    const userCheckResponse = await fetch(`${API_URL}/wp-json/wp/v2/users?email=${encodeURIComponent(userEmail)}`, { headers: { 'Authorization': auth } });
    const existingUsers = await userCheckResponse.json();

    if (Array.isArray(existingUsers) && existingUsers.length === 0) {
      // User does not exist, create a new one
      const newPassword = generateRandomPassword();
      const username = userEmail.split('@')[0] + Date.now().toString().slice(-4); // Create a unique username

      const newUserResponse = await fetch(`${API_URL}/wp-json/wp/v2/users`, {
        method: 'POST',
        headers: { 'Authorization': auth, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: userEmail,
          password: newPassword,
          first_name: billingDetails.firstName,
          last_name: billingDetails.lastName,
          roles: ['customer'],
        }),
      });

      if (newUserResponse.ok) {
        // New user created, now get a token for them
        const tokenResponse = await fetch(`${API_URL}/wp-json/jwt-auth/v1/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, password: newPassword }),
        });
        const tokenData = await tokenResponse.json();
        if (tokenData.token) {
          jwtToken = tokenData.token;
        }
      }
    }

    return NextResponse.json({ success: true, order: orderResult, token: jwtToken }, { status: 201 });

  } catch (error) {
    console.error('Lỗi máy chủ nội bộ:', error);
    return NextResponse.json({ message: 'Đã xảy ra lỗi không mong muốn.' }, { status: 500 });
  }
}