"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://course.learnwithcap.com/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        }
      );

      const data = await res.json();

      if (data.token) {
        toast.success("Đăng nhập thành công! Đang chuyển hướng...");
        localStorage.setItem("wp_token", data.token);

        // Redirect to WordPress for auto-login
        window.location.href =
          "https://course.learnwithcap.com/wp-json/custom-sso/v1/login?token=" +
          data.token;
      } else {
        let errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng.";
        if (data.code === "[jwt_auth] invalid_username") {
          errorMessage = "Tên đăng nhập không tồn tại.";
        } else if (data.code === "[jwt_auth] incorrect_password") {
          errorMessage = "Mật khẩu không chính xác.";
        }
        throw new Error(data.message || errorMessage);
      }
    } catch (error: any) {
      toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-100">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link href="/">
              <Image
                src="https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png"
                alt="CAP English Training Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-cap-dark-blue">
            Đăng nhập
          </CardTitle>
          <CardDescription>Chào mừng bạn quay trở lại!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email hoặc Tên đăng nhập</Label>
              <Input
                id="email"
                type="text"
                placeholder="Nhập email hoặc tên đăng nhập"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  href="https://course.learnwithcap.com/tai-khoan/lost-password/"
                  className="text-sm text-cap-purple hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-cap-purple hover:bg-cap-dark-blue h-11 text-base"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Đăng nhập
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link
              href="https://course.learnwithcap.com/dang-ky/"
              className="font-medium text-cap-purple hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Đăng ký ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}