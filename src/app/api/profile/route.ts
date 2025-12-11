import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const WP_API_URL = "https://course.learnwithcap.com/wp-json";

interface UserPayload {
  data: {
    user: {
      id: string;
    }
  }
}

// Helper function to fetch data from WordPress with authentication
async function fetchWpApi(endpoint: string, token: string) {
  const response = await fetch(`${WP_API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 } // Cache for 60 seconds
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API call failed with status ${response.status}`);
  }

  return response.json();
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ message: 'Yêu cầu xác thực.' }, { status: 401 });
    }

    const decoded: UserPayload = jwtDecode(token);
    const userId = decoded.data.user.id;

    // Fetch all data in parallel
    const [enrolledCourses, orders] = await Promise.all([
      fetchWpApi(`/tutor/v1/my-courses`, token),
      fetchWpApi(`/wc/v3/orders?customer=${userId}`, token)
    ]);

    const completedCourses = enrolledCourses.filter((course: any) => course.course_status === 'completed').length;

    return NextResponse.json({
      enrolled_courses: enrolledCourses,
      completed_courses_count: completedCourses,
      orders: orders,
    }, { status: 200 });

  } catch (error: any) {
    console.error('API Profile GET Error:', error);
    return NextResponse.json({ message: error.message || 'Lỗi máy chủ nội bộ.' }, { status: 500 });
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
      apiEndpoint = `${WP_API_URL}/tutor/v1/update-profile`;
      apiPayload = {
        user_id: userId,
        first_name: payload.first_name,
        last_name: payload.last_name,
      };
    } else if (action === 'update_password') {
      apiEndpoint = `${WP_API_URL}/tutor/v1/update-password`;
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