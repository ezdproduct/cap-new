import React from "react";
import Image from "next/image";
import { RefreshCw, BookText, Mic, Users, Target } from "lucide-react";

const solutions = [
  {
    icon: RefreshCw,
    description: "Xây dựng thói quen và kỹ năng tự học",
  },
  {
    icon: BookText,
    description: "Thực hành giao tiếp tiếng Anh với mẫu câu, từ vựng sát thực tế công việc",
  },
  {
    icon: Mic,
    description: "Phát triển toàn diện kỹ năng, ưu tiên nghe nói, soạn thảo email và thuyết trình",
  },
  {
    icon: Users,
    description: "Xây dựng nền phát âm chuẩn IPA, ngữ pháp cơ bản (thực hành trong bài học, không đi sâu vào lý thuyết)",
  },
  {
    icon: Target,
    description: "Học theo lộ trình phù hợp, từ cơ bản đến nâng cao, kiến thức được lặp lại giúp nhớ lâu và sử dụng tự tin",
  },
];

const FeatureItem = ({ icon: Icon, description }: { icon: React.ElementType; description: string }) => (
  <div className="p-6 rounded-2xl bg-[#0a3253] border border-white/10 hover:border-white/20 transition-colors duration-300 h-full flex flex-col items-start text-left group">
    <div className="flex-shrink-0 mb-4">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
        <Icon className="h-6 w-6 text-cap-sky-blue" />
      </div>
    </div>
    <p className="text-base text-gray-200 flex-grow leading-relaxed font-light">{description}</p>
  </div>
);

export default function FeaturesSection() {
  return (
    <section id="solutions" className="py-12 md:py-20 bg-cap-dark-blue text-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Section: Title and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 items-center">
          {/* Left: Title Block */}
          <div className="flex flex-col gap-6 items-start text-left">
            <span className="inline-block bg-cap-sky-blue/10 text-cap-sky-blue border border-cap-sky-blue/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
              GIẢI PHÁP
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Giải pháp của CAP <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cap-sky-blue to-white">dành cho bạn</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Chúng tôi cung cấp lộ trình học tập được cá nhân hóa, giúp bạn làm chủ tiếng Anh và tự tin trong môi trường làm việc quốc tế.
            </p>
          </div>

          {/* Right: Image Block */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-cap-purple/20 to-transparent z-10 mix-blend-overlay pointer-events-none"></div>
              <Image
                src="https://course.learnwithcap.com/wp-content/uploads/2025/10/danist-soh-8Gg2Ne_uTcM-unsplash-scaled-1.webp"
                alt="Team collaboration"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {solutions.map((solution, index) => (
            <FeatureItem key={index} icon={solution.icon} description={solution.description} />
          ))}
        </div>
      </div>
    </section>
  );
}