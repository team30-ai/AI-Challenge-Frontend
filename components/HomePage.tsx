import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

import { AlertTriangle, BarChart, Map } from "lucide-react";

const HomePage = () => {
  const highRiskCount = 4;

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AIoife – Saving Lives Through AI-Powered Hospital Overcrowding Alerts
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Preventing avoidable deaths in Irish hospitals through real-time
            risk alerts and capacity intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                <Map className="mr-2 h-5 w-5" />
                See Hospital Risks Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn Aoife&apos;s Story</Link>
            </Button>
            {highRiskCount > 0 && (
              <Button size="lg" variant="destructive" asChild>
                <Link href="/alerts">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  View {highRiskCount} Critical Alert
                  {highRiskCount > 1 ? "s" : ""}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How AIoife Helps Save Lives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Real-time Risk Assessment
              </h3>
              <p className="text-gray-600">
                Monitor hospital overcrowding with AI-powered risk scoring
                based on key metrics like ED trolleys and delayed transfers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Emergency Alerts</h3>
              <p className="text-gray-600">
                Receive instant notifications when hospitals reach critical
                overcrowding levels, enabling rapid response.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.5 2v4.5" />
                  <path d="M14.5 2v4.5" />
                  <path d="M7.5 14.5L10 17L16 11" />
                  <path d="M3 10h18" />
                  <path d="M19 6.5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11a2 2 0 0 0-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Smart Recommendations
              </h3>
              <p className="text-gray-600">
                Get intelligent suggestions for patient transfers between
                hospitals to balance capacity and reduce risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aoife's Story Preview */}
      <section className="py-16 bg-gray-50 rounded-2xl my-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Aoife Johnston&apos;s Story
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              In December 2022, 16-year-old Aoife Johnston died from meningitis
              after waiting 16 hours on a hospital trolley. Her death was
              preventable.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              AIoife is named in her memory, with a mission to ensure no family
              suffers such a preventable tragedy again.
            </p>
            <Button variant="outline" asChild>
              <Link href="/about">Read Full Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Help Prevent the Next Tragedy
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in our mission to eliminate preventable deaths due to
            hospital overcrowding in Ireland.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">View National Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
