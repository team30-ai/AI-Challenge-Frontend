import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="bg-indigo-50">
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
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                   
                   View Github Codebase
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
