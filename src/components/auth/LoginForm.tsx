"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Đang đăng nhập...");

    try {
      const res = await fetch(
        "https://course.learnwithcap.com/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (data.token) {
        setToken(data.token);
        toast.success("Đăng nhập thành công! Đang chuyển hướng...", {
          id: loadingToast,
        });

        // Redirect sang WordPress để auto login
        window.location.href =
          "https://course.learnwithcap.com/wp-json/custom-sso/v1/login?token=" +
          data.token;
      } else {
        // Ném lỗi để block catch xử lý
        throw new Error(data.message || "Tên đăng nhập hoặc mật khẩu không đúng.");
      }
    } catch (error: any) {
      toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
        id: loadingToast,
      });
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
        <CardDescription>
          Nhập thông tin tài khoản của bạn để tiếp tục.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập hoặc Email</Label>
            <Input
              id="username"
              placeholder="Nhập tên đăng nhập"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Đăng nhập
          </Button>
          <p className="text-sm text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="font-medium text-cap-purple hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}