import { Product } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/AddToCartButton';
import { Check, PlayCircle } from 'lucide-react';

const CoursePurchaseCard = ({ product }: { product: Product }) => {
  const features = [
    "Truy cập trọn đời",
    "Học trên mọi thiết bị",
    "Bài tập thực hành",
    "Chứng chỉ hoàn thành",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="relative aspect-video w-full">
        <Image
          src={product.images[0]?.src || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <button className="h-16 w-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-colors">
            <PlayCircle className="h-8 w-8" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div 
          className="text-3xl font-bold text-cap-dark-blue mb-4 text-center"
          dangerouslySetInnerHTML={{ __html: product.price_html }}
        />
        <div className="space-y-3">
          <AddToCartButton product={product} className="w-full h-12 text-lg" />
          <Button variant="outline" className="w-full h-12 text-lg">Mua ngay</Button>
        </div>
        <ul className="mt-6 space-y-3 text-sm text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePurchaseCard;