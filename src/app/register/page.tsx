import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png"
              alt="CAP English Training Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-12 w-auto mx-auto"
            />
          </Link>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}