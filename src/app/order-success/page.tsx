import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getOrderById } from '@/lib/api';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
    const { order_id: orderId } = await searchParams;
    const order = orderId ? await getOrderById(orderId) : null;

    if (!order) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50/50">
                <div className="bg-red-100 p-5 rounded-full mb-6 animate-in zoom-in duration-500">
                    <ShoppingBag className="h-10 w-10 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold mb-3 text-cap-dark-blue">Không tìm thấy đơn hàng</h1>
                <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                    Mã đơn hàng không hợp lệ hoặc đã có lỗi xảy ra. Vui lòng kiểm tra lại email của bạn hoặc liên hệ bộ phận hỗ trợ.
                </p>
                <Button asChild className='bg-cap-purple hover:bg-cap-dark-blue text-white h-12 px-8 text-base rounded-xl shadow-lg shadow-purple-100'>
                    <Link href="/shop">Quay lại cửa hàng</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50/50 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">

                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 animate-in zoom-in duration-500">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-cap-dark-blue mb-4">Đặt hàng thành công!</h1>

                <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
                    Cảm ơn bạn đã tin tưởng. Đơn hàng <span className="font-semibold text-gray-900">#{order.id}</span> đã được xác nhận.
                    Một email chi tiết đã được gửi tới <span className="font-semibold text-cap-purple">{order.billing.email}</span>.
                </p>

                {order.payment_method === 'bacs' && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 my-8 text-left">
                        <h3 className="font-bold text-cap-dark-blue mb-3">Thông tin chuyển khoản</h3>
                        <div className="text-sm text-gray-700 space-y-1.5">
                            <p>Ngân hàng: <span className="font-semibold text-gray-900">Vietcombank</span></p>
                            <p>Số tài khoản: <span className="font-semibold text-gray-900">123456789</span></p>
                            <p>Chủ tài khoản: <span className="font-semibold text-gray-900">CAP ENGLISH TRAINING</span></p>
                            <p className="text-cap-purple mt-3 bg-purple-50 inline-block px-3 py-1.5 rounded-md border border-purple-100">
                                Nội dung: <strong className="font-mono">Mã đơn #{order.id}</strong>
                            </p>
                        </div>
                    </div>
                )}

                <div className="mt-10">
                    <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue text-white h-12 text-base px-8 rounded-xl shadow-lg shadow-purple-100 transition-all hover:shadow-xl w-full sm:w-auto">
                        <Link href="/shop">
                            Tiếp tục khám phá <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}