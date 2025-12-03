import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cap-dark-blue text-white pt-16 pb-8 mt-auto border-t-[0.5px] border-cap-sky-blue/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png"
                alt="CAP English Training Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              CAP English Training - Đào tạo tiếng Anh giao tiếp & kỹ năng làm việc chuyên nghiệp, giúp bạn tự tin vươn xa trong sự nghiệp.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-cap-purple transition-colors text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-cap-purple transition-colors text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-cap-purple transition-colors text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider border-b border-white/10 pb-2 w-fit">Liên hệ</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cap-sky-blue flex-shrink-0 mt-0.5" />
                <span>Tp. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cap-sky-blue flex-shrink-0" />
                <a href="tel:0909123456" className="hover:text-white">0909 123 456</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cap-sky-blue flex-shrink-0" />
                <a href="mailto:info@learnwithcap.com" className="hover:text-white">info@learnwithcap.com</a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider border-b border-white/10 pb-2 w-fit">Liên kết</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link href="/shop" className="hover:text-cap-sky-blue transition-colors">Khóa học</Link></li>
              <li><Link href="/#solutions" className="hover:text-cap-sky-blue transition-colors">Giải pháp</Link></li>
              <li><Link href="#" className="hover:text-cap-sky-blue transition-colors">Về chúng tôi</Link></li>
              <li><Link href="#" className="hover:text-cap-sky-blue transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider border-b border-white/10 pb-2 w-fit">Chính sách</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-cap-sky-blue transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-cap-sky-blue transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="hover:text-cap-sky-blue transition-colors">Chính sách hoàn tiền</Link></li>
              <li><Link href="#" className="hover:text-cap-sky-blue transition-colors">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} CAP English Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}