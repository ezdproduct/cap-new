"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Đang tạo tài khoản...");

    try {
      const res = await fetch(
        "https://course.learnwithcap.com/wp-json/custom-sso/v1/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok && (data.code === 200 || data.id)) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.", {
          id: loadingToast,
        });
        router.push("/login");
      } else {
        const message = data.message ? data.message.replace(/<[^>]*>?/gm, '') : "Đã xảy ra lỗi không xác định.";
        throw new Error(message);
      }
    } catch (error: any) {
      toast.error(error.message || "Đăng ký thất bại. Vui lòng thử lại.", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
        <CardDescription>
          Tạo tài khoản mới để bắt đầu học ngay.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleRegister}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              placeholder="Chọn tên đăng nhập"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Tạo mật khẩu"
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
            Đăng ký
          </Button>
          <p className="text-sm text-center text-gray-600">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-medium text-cap-purple hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}