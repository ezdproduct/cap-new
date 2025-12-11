'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Play,
    Star,
    Check,
    ChevronDown,
    ChevronRight,
    FolderOpen,
    Layers,
    Calendar,
    Video,
    FileText,
    Infinity as InfinityIcon,
    Smartphone,
    Award,
    ShieldCheck,
    ThumbsUp,
    Share2,
    Heart
} from "lucide-react";
import { Product } from "@/lib/types";

// --- Interfaces ---
interface BadgeProps {
    icon: React.ElementType;
    text: string | number;
    label?: string;
}

interface Section {
    title: string;
    lessons: { title: string; duration?: string; type?: string }[];
    duration?: string;
}

interface AccordionItemProps {
    section: Section;
    isOpen: boolean;
    onClick: () => void;
}

interface StarRatingProps {
    rating: number;
    size?: string;
}

// --- Helper Components ---
const Badge = ({ icon: Icon, text, label }: BadgeProps) => (
    <div className="flex items-center text-sm text-slate-400">
        <Icon className="w-4 h-4 mr-2 text-cap-sky-blue" />
        <span>
            {label ? `${label}: ` : ""}
            <span className="text-slate-200 font-medium">{text}</span>
        </span>
    </div>
);

const Tag = ({ text }: { text: string }) => (
    <span className="inline-block px-4 py-1.5 mr-2 mb-2 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-semibold hover:bg-blue-50 hover:text-cap-dark-blue hover:border-cap-sky-blue transition-all duration-200 shadow-sm hover:shadow-md cursor-default">
        {text}
    </span>
);

const BenefitItem = ({ text }: { text: string }) => (
    <div className="flex p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <Check className="w-5 h-5 text-cap-sky-blue mt-0.5 mr-3 flex-shrink-0" />
        <span className="text-slate-600 text-sm font-medium leading-relaxed">
            {text}
        </span>
    </div>
);

const AccordionItem = ({ section, isOpen, onClick }: AccordionItemProps) => (
    <div className="border-b border-slate-100 last:border-0">
        <button
            className={`w-full flex justify-between items-center px-6 py-5 transition-colors duration-200 text-left group ${isOpen ? "bg-slate-50" : "bg-white hover:bg-slate-50"
                }`}
            onClick={onClick}
        >
            <div className="flex items-center">
                <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 shadow-sm border transition-colors ${isOpen
                        ? "bg-cap-dark-blue border-cap-dark-blue text-white"
                        : "bg-white border-slate-100 text-slate-400 group-hover:text-cap-dark-blue group-hover:border-blue-100"
                        }`}
                >
                    {isOpen ? (
                        <FolderOpen className="w-5 h-5" />
                    ) : (
                        <Layers className="w-5 h-5" />
                    )}
                </span>
                <div>
                    <span
                        className={`font-bold block text-base ${isOpen ? "text-cap-dark-blue" : "text-slate-800"
                            }`}
                    >
                        {section.title}
                    </span>
                    <span className="text-xs text-slate-500 font-normal">
                        {section.lessons?.length || 0} bài học
                        {section.duration ? ` • ${section.duration}` : ""}
                    </span>
                </div>
            </div>
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-blue-100 rotate-180" : "bg-slate-100"
                    }`}
            >
                <ChevronDown
                    className={`w-4 h-4 ${isOpen ? "text-cap-dark-blue" : "text-slate-400"
                        }`}
                />
            </div>
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
        >
            <ul className="bg-white py-2">
                {section.lessons.map((lesson, idx) => (
                    <li
                        key={idx}
                        className="flex justify-between items-center px-6 py-3 hover:bg-blue-50/60 transition-colors cursor-pointer group border-l-4 border-transparent hover:border-cap-sky-blue"
                    >
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                                <Play className="w-3 h-3 text-slate-400 fill-current group-hover:text-cap-dark-blue ml-0.5" />
                            </div>
                            <span className="text-slate-600 text-sm font-medium group-hover:text-cap-dark-blue transition-colors">
                                {lesson.title}
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            {lesson.duration && (
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                                    {lesson.duration}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const StarRating = ({ rating, size = "w-3.5 h-3.5" }: StarRatingProps) => (
    <div className="flex space-x-0.5">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`${size} ${i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300 fill-slate-100"
                    }`}
            />
        ))}
    </div>
);

const CourseCard = ({ course }: { course: Product }) => (
    <Link href={`/course/${course.slug}`}>
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
            <div className="relative h-40 overflow-hidden">
                <Image
                    src={course.images?.[0]?.src || "/placeholder-course.jpg"}
                    alt={course.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 mb-1 line-clamp-2 leading-snug group-hover:text-cap-dark-blue transition-colors">
                    {course.name}
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                    {course.instructor || "CAP Instructor"}
                </p>
                <div className="flex items-center space-x-1 mb-3 mt-auto">
                    <span className="text-yellow-500 font-bold text-xs">
                        {course.rating || 5.0}
                    </span>
                    <StarRating rating={course.rating || 5} size="w-3 h-3" />
                    <span className="text-xs text-slate-400">
                        ({course.totalEnrolled || 0})
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">
                        {course.price}
                    </span>
                </div>
            </div>
        </div>
    </Link>
);

const ReviewItem = ({
    review,
}: {
    review: {
        id: number;
        user: string;
        date: string;
        rating: number;
        comment: string;
        helpful: number;
    };
}) => (
    <div className="py-6 border-b border-slate-100 last:border-0">
        <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cap-sky-blue to-cap-purple flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {review.user.charAt(0)}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">{review.user}</h4>
                    <span className="text-xs text-slate-400">{review.date}</span>
                </div>
                <div className="mb-2">
                    <StarRating rating={review.rating} size="w-3 h-3" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    {review.comment}
                </p>
                <button className="flex items-center text-xs text-slate-400 hover:text-cap-dark-blue transition-colors space-x-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Hữu ích ({review.helpful})</span>
                </button>
            </div>
        </div>
    </div>
);

export default function CourseDetailClient({
    course,
    relatedCourses,
}: {
    course: Product;
    relatedCourses: Product[];
}) {
    const [openSection, setOpenSection] = useState<number | null>(0);
    const [scrolled, setScrolled] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const breadcrumbs = ["Trang chủ", "Khóa học", course.name];

    // Mock reviews data if not present in course object
    const reviewsList = [
        {
            id: 1,
            user: "Nguyễn Văn An",
            date: "2 ngày trước",
            rating: 5,
            comment:
                "Khóa học rất chi tiết và dễ hiểu. Giảng viên giải thích cặn kẽ. Rất đáng thời gian học.",
            helpful: 12,
        },
        {
            id: 2,
            user: "Trần Thị Bích",
            date: "1 tuần trước",
            rating: 4,
            comment:
                "Nội dung tốt, tuy nhiên cần thêm nhiều ví dụ thực tế hơn.",
            helpful: 5,
        },
    ];

    return (
        <div className="font-sans text-slate-600 bg-slate-50 antialiased selection:bg-blue-100 selection:text-cap-dark-blue min-h-screen">
            {/* Header / Hero Section */}
            <div className="bg-cap-dark-blue text-white pt-12 pb-12 lg:pb-40 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cap-sky-blue opacity-10 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cap-purple opacity-10 blur-[100px]"></div>

                <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
                    <div className="lg:col-span-8">
                        {/* Breadcrumbs */}
                        <div className="text-sm text-slate-400 mb-6 font-medium flex items-center flex-wrap gap-2">
                            {breadcrumbs.map((crumb, idx) => (
                                <React.Fragment key={idx}>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors hover:underline"
                                    >
                                        {crumb}
                                    </Link>
                                    {idx < breadcrumbs.length - 1 && (
                                        <ChevronRight className="w-3 h-3 text-slate-600" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 leading-tight tracking-tight text-white">
                            {course.name}
                        </h1>

                        <div className="text-base text-slate-300 mb-8 leading-relaxed border-l-4 border-cap-sky-blue pl-4 bg-white/5 py-3 rounded-r-lg backdrop-blur-sm">
                            <p className="line-clamp-2">
                                {course.description
                                    ? course.description.replace(/<[^>]+>/g, '').substring(0, 150) + '...'
                                    : "Khóa học chất lượng cao từ CAP English."}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-400 mb-8">
                            <Badge
                                icon={FolderOpen}
                                label="Danh mục"
                                text={course.categories?.map((c) => c.name).join(", ") || "General"}
                            />
                            <Badge
                                icon={Layers}
                                label="Cấp độ"
                                text={course.level || "Tất cả trình độ"}
                            />
                            <Badge
                                icon={Calendar}
                                label="Thời lượng"
                                text={course.duration || "N/A"}
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <span className="font-bold text-lg mr-2 text-yellow-400">
                                    {course.rating || 5.0}
                                </span>
                                <StarRating rating={course.rating || 5.0} />
                            </div>
                            <span className="text-sm text-slate-400 underline decoration-slate-600 underline-offset-4 hover:text-white transition-colors cursor-pointer">
                                ({course.totalEnrolled || 100} học viên)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-[1200px] mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                    {/* Left Column Content */}
                    <div className="lg:col-span-8 pt-8 lg:pt-12 order-2 lg:order-1">
                        {/* Requirements Section */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-1.5 h-8 bg-cap-dark-blue rounded-full mr-3 shadow-lg shadow-blue-200"></span>
                                Bạn sẽ được học:
                            </h3>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                {course.requirements && course.requirements.length > 0 ? (
                                    <ul className="space-y-4 text-slate-600">
                                        {course.requirements.map((req, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="bg-blue-50 text-cap-dark-blue rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                                    <Check className="w-3.5 h-3.5" />
                                                </span>
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-slate-500 italic">
                                        Thông tin đang được cập nhật...
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Benefits Grid */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-1.5 h-8 bg-cap-dark-blue rounded-full mr-3 shadow-lg shadow-blue-200"></span>
                                Bạn sẽ học được gì?
                            </h3>
                            {course.benefits && course.benefits.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.benefits.map((benefit, i) => (
                                        <BenefitItem key={i} text={benefit} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                    <p className="text-slate-500 italic">
                                        Thông tin đang được cập nhật...
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">
                                Từ khóa phổ biến:
                            </h3>
                            {course.tags && course.tags.length > 0 ? (
                                <div className="flex flex-wrap">
                                    {course.tags.map((tag, i) => (
                                        <Tag key={i} text={tag} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 italic text-sm">chưa có từ khóa.</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Giới thiệu tổng quan
                            </h3>
                            <div className={`relative text-slate-600 leading-7 text-justify bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 ${!showFullDesc ? 'max-h-[300px] overflow-hidden' : ''}`}>
                                {course.description ? (
                                    <div
                                        className="prose prose-sm max-w-none text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: course.description }}
                                    />
                                ) : (
                                    <p className="text-slate-500 italic">
                                        Nội dung đang được cập nhật...
                                    </p>
                                )}
                                {!showFullDesc && (
                                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                                )}
                            </div>
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="text-cap-purple font-bold text-sm mt-4 hover:text-cap-dark-blue flex items-center gap-1 transition-colors"
                            >
                                {showFullDesc ? 'Thu gọn' : 'Xem thêm'}
                                {showFullDesc ? <ChevronDown className="rotate-180 transition-transform" size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>

                        {/* Instructor Section */}
                        <div className="mb-12 text-slate-600">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-1.5 h-8 bg-cap-dark-blue rounded-full mr-3 shadow-lg shadow-blue-200"></span>
                                Giảng viên
                            </h3>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <Link href="#" className="text-cap-purple font-bold underline text-lg block mb-1 hover:text-cap-dark-blue transition-colors">
                                    {course.instructor || "Felix Harder"}
                                </Link>
                                <p className="text-slate-500 text-sm mb-4">University Professor | English Language Specialist</p>
                                <div className="flex gap-6 items-start mb-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200 shrink-0">
                                        <Image
                                            src="https://i.pravatar.cc/150?img=12"
                                            alt={course.instructor || "Instructor"}
                                            width={96}
                                            height={96}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <ul className="text-sm text-slate-700 space-y-2 mt-1">
                                        <li className="flex items-center">
                                            <Star size={14} className="text-yellow-500 mr-2" fill="currentColor" />
                                            <span className="font-bold mr-1">4.7</span> Xếp hạng giảng viên
                                        </li>
                                        <li className="flex items-center">
                                            <Award size={14} className="text-slate-600 mr-2" />
                                            <span className="font-bold mr-1">12,345</span> Đánh giá
                                        </li>
                                        <li className="flex items-center">
                                            <Play size={14} className="text-slate-600 mr-2" />
                                            <span className="font-bold mr-1">10</span> Khóa học
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Giảng viên {course.instructor || "Felix Harder"} đã có nhiều năm kinh nghiệm giảng dạy và giúp đỡ hàng ngàn học viên vượt qua nỗi sợ hãi khi học tiếng Anh. Phong cách giảng dạy thực tế, dễ hiểu và truyền cảm hứng.
                                </p>
                            </div>
                        </div>

                        {/* Curriculum Accordion */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-1.5 h-8 bg-cap-dark-blue rounded-full mr-3 shadow-lg shadow-blue-200"></span>
                                Nội dung khóa học
                            </h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                {course.curriculum && course.curriculum.length > 0 ? (
                                    course.curriculum.map((section, idx) => (
                                        <AccordionItem
                                            key={idx}
                                            section={section}
                                            isOpen={openSection === idx}
                                            onClick={() =>
                                                setOpenSection(openSection === idx ? null : idx)
                                            }
                                        />
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-slate-500 italic">
                                        Nội dung đang được cập nhật...
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-slate-200 w-full mb-12"></div>

                        {/* REVIEWS SECTION */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="w-1.5 h-8 bg-cap-dark-blue rounded-full mr-3 shadow-lg shadow-blue-200"></span>
                                    Đánh giá từ học viên
                                </div>
                                <div className="flex items-center space-x-2 text-sm bg-blue-50 px-3 py-1.5 rounded-lg">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-cap-dark-blue">
                                        {course.rating || 5.0}
                                    </span>
                                    <span className="text-cap-dark-blue font-medium">
                                        Đánh giá chung
                                    </span>
                                </div>
                            </h3>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 sm:px-8 py-2">
                                {reviewsList.map((review) => (
                                    <ReviewItem key={review.id} review={review} />
                                ))}
                                <button className="w-full py-4 text-sm font-bold text-cap-dark-blue hover:bg-blue-50/50 transition-colors mt-2">
                                    Xem tất cả đánh giá
                                </button>
                            </div>
                        </div>

                        {/* RELATED COURSES SECTION */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className="w-1.5 h-8 bg-cap-dark-blue rounded-full mr-3 shadow-lg shadow-blue-200"></span>
                                Khóa học liên quan
                            </h3>
                            {relatedCourses.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {relatedCourses.map((relatedCourse) => (
                                        <CourseCard key={relatedCourse.id} course={relatedCourse} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 italic">
                                    Chưa có khóa học liên quan.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 order-1 lg:order-2 relative z-20">
                        <div
                            className={`lg:sticky lg:top-6 lg:-mt-[220px] transition-all duration-500`}
                        >
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 group">
                                {/* Video Area */}
                                <div className="bg-slate-900 h-[220px] w-full flex items-center justify-center relative cursor-pointer overflow-hidden">
                                    <Image
                                        src={course.images?.[0]?.src || "/placeholder-course.jpg"}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        alt="Course Thumbnail"
                                        fill
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                    <div className="relative z-10">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-30 animate-ping"></span>
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative shadow-lg group-hover:scale-110 transition-transform duration-200">
                                            <Play className="w-6 h-6 text-cap-dark-blue ml-1 fill-current" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-0 right-0 text-center">
                                        <span className="text-white text-xs font-bold bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md uppercase tracking-wider">
                                            Xem trước
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                                        <div>
                                            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                                {course.price}
                                            </div>
                                            <div className="text-slate-400 line-through text-sm font-medium mt-1">
                                                {course.regular_price && course.regular_price !== course.price ? course.regular_price : ""}
                                            </div>
                                        </div>
                                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                            Unlimited
                                        </span>
                                    </div>

                                    <button className="w-full bg-gradient-to-r from-cap-dark-blue to-cap-navy text-white py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 mb-4 flex items-center justify-center">
                                        Đăng ký ngay
                                    </button>

                                    <p className="text-center text-xs text-slate-400 mb-8 flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 mr-1" />
                                        <span className="ml-1">Đảm bảo hoàn tiền trong 30 ngày</span>
                                    </p>

                                    <h4 className="font-bold text-slate-900 text-xs mb-5 uppercase tracking-wider">
                                        Khóa học bao gồm:
                                    </h4>

                                    <ul className="space-y-4">
                                        <li className="flex items-center text-sm text-slate-600 group hover:text-cap-dark-blue transition-colors">
                                            <div className="w-8 flex justify-center">
                                                <Video className="w-4 h-4 text-cap-sky-blue group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="font-medium">
                                                Video hướng dẫn chi tiết
                                            </span>
                                        </li>
                                        <li className="flex items-center text-sm text-slate-600 group hover:text-cap-dark-blue transition-colors">
                                            <div className="w-8 flex justify-center">
                                                <FileText className="w-4 h-4 text-cap-sky-blue group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="font-medium">Tài liệu học tập</span>
                                        </li>
                                        <li className="flex items-center text-sm text-slate-600 group hover:text-cap-dark-blue transition-colors">
                                            <div className="w-8 flex justify-center">
                                                <InfinityIcon className="w-4 h-4 text-cap-sky-blue group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="font-medium">Truy cập trọn đời</span>
                                        </li>
                                        <li className="flex items-center text-sm text-slate-600 group hover:text-cap-dark-blue transition-colors">
                                            <div className="w-8 flex justify-center">
                                                <Smartphone className="w-4 h-4 text-cap-sky-blue group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="font-medium">Học trên mọi thiết bị</span>
                                        </li>
                                        <li className="flex items-center text-sm text-slate-600 group hover:text-cap-dark-blue transition-colors">
                                            <div className="w-8 flex justify-center">
                                                <Award className="w-4 h-4 text-cap-sky-blue group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="font-medium">Chứng chỉ hoàn thành</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Target Audience Widget */}
                            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-slate-100 mt-6">
                                <h4 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider flex items-center">
                                    Dành cho ai?
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-sm text-slate-600">
                                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                                        <span>Người muốn nâng cao kỹ năng chuyên môn</span>
                                    </li>
                                    <li className="flex items-start text-sm text-slate-600">
                                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                                        <span>Sinh viên và người đi làm</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
