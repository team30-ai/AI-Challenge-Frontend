import React from "react";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router"; 

function Home() {

    const router = useRouter(); 

    const handleAuthRedirect = (type: "register" | "login") => {
      router.push(`/auth?type=${type}`);
    };

  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-b from-indigo-50 to-transparent lg:grid lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
          <div className="max-w-prose text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-1">
              Smarter care starts with
              <span className="text-[var(--cc-primary)] mb-1"> real-time </span>
              insight
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Crowdia gives you real-time updates on hospital overcrowding,
              trolley counts, and bed availability — all in one place. Make
              faster, smarter care decisions for you and your family, right when
              it matters most.
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
               <button
                onClick={() => handleAuthRedirect("register")}
                className="inline-block rounded-full border border-[var(--cc-primary)] bg-[var(--cc-primary)] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:[var(--cc-secondary)] cursor-pointer"
              >
                Create An Account
              </button>

              <button
                onClick={() => handleAuthRedirect("login")}
                className="inline-block rounded-full border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/hero-image.svg"
              alt="CrowdCare Character"
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
