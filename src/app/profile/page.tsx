import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-cap-dark-blue">Bảng điều khiển</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Khóa học đã đăng ký</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Khóa học đã hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chứng chỉ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        {/* Các component khác sẽ được thêm vào đây sau */}
        <p className="text-gray-500">Chào mừng bạn đến với khu vực học tập của mình!</p>
      </div>
    </div>
  );
}