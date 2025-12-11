import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const TUTOR_API_URL = "https://course.learnwithcap.com/wp-json/tutor/v1";

interface UserPayload {
  data: {
    user: {
      id: string;
    }
  }
}

export async function PUT(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ message: 'Yêu cầu xác thực.' }, { status: 401 });
    }

    const decoded: UserPayload = jwtDecode(token);
    const userId = decoded.data.user.id;

    const body = await req.json();
    const { action, ...payload } = body;

    let apiEndpoint = '';
    let apiPayload: any = {};

    if (action === 'update_profile') {
      apiEndpoint = `${TUTOR_API_URL}/update-profile`;
      apiPayload = {
        user_id: userId,
        first_name: payload.first_name,
        last_name: payload.last_name,
      };
    } else if (action === 'update_password') {
      apiEndpoint = `${TUTOR_API_URL}/update-password`;
      apiPayload = {
        user_id: userId,
        old_password: payload.old_password,
        new_password: payload.new_password,
        confirm_password: payload.confirm_password,
      };
    } else {
      return NextResponse.json({ message: 'Hành động không hợp lệ.' }, { status: 400 });
    }

    const response = await fetch(apiEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(apiPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      // Tutor LMS API có thể trả về lỗi trong `data.message`
      const errorMessage = data.message || 'Đã xảy ra lỗi từ máy chủ Tutor LMS.';
      return NextResponse.json({ message: errorMessage }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    if (error.name === 'InvalidTokenError') {
        return NextResponse.json({ message: 'Token không hợp lệ.' }, { status: 401 });
    }
    console.error('API Profile Error:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ.' }, { status: 500 });
  }
}