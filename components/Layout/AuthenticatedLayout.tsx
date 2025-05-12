import AuthNavbar from "../Navbar/AuthNavbar";

type Props = {
  children: React.ReactNode;
  onSectionChange: (section: string) => void;
};

export default function AuthenticatedLayout({ children, onSectionChange }: Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <AuthNavbar onSectionChange={onSectionChange} />
      <main className="mt-4 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
