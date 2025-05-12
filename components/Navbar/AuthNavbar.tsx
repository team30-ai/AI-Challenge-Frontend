import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  onSectionChange: (section: string) => void;
};

function AuthNavbar({ onSectionChange }: Props) {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
          <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link
                href="/"
                className="text-2xl font-extrabold text-[var(--cc-primary)] tracking-tight"
              >
                Crowdia
              </Link>
            </div>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <button onClick={() => onSectionChange("dashboard")}>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => onSectionChange("hospitals")}>
                    Hospitals
                  </button>
                </li>
                <li>
                  <button onClick={() => onSectionChange("schedules")}>
                    Schedules
                  </button>
                </li>
                <li>
                  <button onClick={() => onSectionChange("settings")}>
                    Settings
                  </button>
                </li>
              </ul>
            </nav>

            <div className="relative hidden md:block">
              <button
                type="button"
                className="overflow-hidden rounded-full border border-gray-300 shadow-inner dark:border-gray-600"
              >
                <span className="sr-only">Toggle dashboard menu</span>

                <Image
                  src="/images/user.png"
                  alt=""
                  width={100}
                  height={100}
                  className="size-10 object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AuthNavbar;
