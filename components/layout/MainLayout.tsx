
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const pathname = usePathname();

    const highRiskCount = 4;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="py-4 px-6 border-b bg-white">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <Link href="/" className="flex items-center">
                            <div className="bg-blue-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">
                                AI
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                AIoife
                            </h1>
                        </Link>
                        <span className="ml-2 text-sm text-gray-500 hidden sm:inline">
                            AI for Overcrowding Intelligence and Fatality Elimination
                        </span>
                    </div>

                    <nav className="flex space-x-1 sm:space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/dashboard", label: "Dashboard" },
                            { href: "/risk-scoring", label: "Risk Scoring" },
                            { href: "/recommendations", label: "Recommendations" },
                            { href: "/alerts", label: "Alerts" },
                            { href: "/about", label: "About" },
                        ].map(({ href, label }) =>
                            href ? (
                                <Button
                                    key={href}
                                    variant={pathname === href ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                    className={label === "Alerts" ? "relative" : ""}
                                >
                                    <Link href={href}>
                                        {label}
                                        {label === "Alerts" && highRiskCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {highRiskCount}
                                            </span>
                                        )}
                                    </Link>
                                </Button>
                            ) : null
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto py-6 px-4">{children}</main>

            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About AIoife</h3>
                            <p className="text-sm">
                                AI-powered system for preventing avoidable deaths in Irish
                                hospitals due to ED overcrowding.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/dashboard" className="hover:text-white">
                                        Hospital Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-white">
                                        About Aoife&apos;s Story
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/alerts" className="hover:text-white">
                                        Emergency Alerts
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <p className="text-sm">
                                For more information or support, please contact us
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm">
                        <p>© {new Date().getFullYear()} AIoife. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {highRiskCount > 0 && pathname !== "/alerts" && (
                <div className="fixed bottom-4 right-4">
                    <Link href="/alerts">
                        <Button variant="destructive" className="flex items-center gap-2">
                            <AlertCircle size={16} />
                            {highRiskCount} Hospital{highRiskCount > 1 ? "s" : ""} at Risk
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MainLayout;
