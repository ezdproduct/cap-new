import ProfileSidebar from '@/components/profile/ProfileSidebar';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProfileSidebar />
        </div>
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}