import UpdateProfileForm from '@/components/profile/UpdateProfileForm';
import UpdatePasswordForm from '@/components/profile/UpdatePasswordForm';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-cap-dark-blue">Cài đặt tài khoản</h1>
      
      <UpdateProfileForm />
      
      <UpdatePasswordForm />
    </div>
  );
}