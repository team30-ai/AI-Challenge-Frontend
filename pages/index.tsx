import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/Layout/AuthenticatedLayout";
import Meta from "@/components/Helper/Meta";
import Dashboard from "@/components/Dashboard/Dashboard";
import Hospital from "@/components/Hospital/Hospital";
import Schedules from "@/components/Schedules/Schedules";

export default function HomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [section, setSection] = useState("dashboard");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      router.push("/welcome");
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleSectionChange = (newSection: string) => {
    setSection(newSection);
  };

  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return (
          <div>
            <Dashboard />
          </div>
        );
      case "hospitals":
        return <div><Hospital/></div>;
      case "schedules":
        return <div><Schedules/></div>;
      case "settings":
        return <div>⚙️ Settings Panel</div>;
      default:
        return <div>📍 Select a section</div>;
    }
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Meta title="CrowdCare" description="..." />
      <AuthenticatedLayout onSectionChange={handleSectionChange}>
        {renderSection()}
      </AuthenticatedLayout>
    </>
  );
}
