/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerUser } from "@/components/Helper/RegisterFunction";
import { useRouter } from "next/router";

function Register() {
  const [locationStatus, setLocationStatus] = useState("locating");
  const [locationName, setLocationName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [coords, setCoords] = useState<{ lat: number | null, lon: number | null }>({
    lat: null,
    lon: null,
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const city = data?.address?.city || data?.address?.town || "";
        const county = data?.address?.county || "";
        const country = data?.address?.country || "";
        const code = data?.address?.country_code?.toUpperCase();

        setLocationName(`${county}, ${country}`);
        setCountryCode(code);

        if (code === "IE") {
          setLocationStatus("allowed");
        } else {
          setLocationStatus("blocked");
        }
      });
    } else {
      setLocationStatus("blocked");
      setLocationName("Unknown");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFeedback("Passwords do not match.");
      return;
    }

    setLoading(true);
    setFeedback("");

    const location = {
      name: locationName,
      country: countryCode,
      lat: coords.lat,
      lon: coords.lon,
    };

    const result = await registerUser(fullName, email, password, location);

    if (result.success) {
      setFeedback(result.message);
      setTimeout(() => {
        router.push("/auth?type=login");
      }, 4000);
    } else {
      setFeedback(result.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-12">
      <div className="sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create your account
        </h2>

        <p className="mt-4 mb-2 text-center text-base text-gray-700">
          Current Location
        </p>

        {locationStatus === "locating" && (
          <span className="block text-center rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
            Searching for your location ...
          </span>
        )}

        {locationStatus === "allowed" && (
          <span className="block text-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {locationName}
          </span>
        )}

        {locationStatus === "blocked" && (
          <>
            <span className="block text-center rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
              {locationName || "Unknown location"}
            </span>
            <p className="mt-3 text-center text-red-500 font-medium">
              This system is not available in your country.
            </p>
          </>
        )}

        {locationStatus === "allowed" && (
          <div className="mt-4 bg-white p-6">
                        {feedback && (
              <p
                className={`text-center text-sm mt-2 ${
                  feedback.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1 border w-full rounded border-gray-300 px-3 py-2 focus:border-[var(--cc-primary)] focus:ring focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 border w-full rounded border-gray-300 px-3 py-2 focus:border-[var(--cc-primary)] focus:ring focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 border w-full rounded border-gray-300 px-3 py-2 pr-10 focus:border-[var(--cc-primary)] focus:ring focus:ring-indigo-200"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 border w-full rounded border-gray-300 px-3 py-2 focus:border-[var(--cc-primary)] focus:ring focus:ring-indigo-200"
                />
              </div>

              {fullName && email && password && confirmPassword && !loading && (
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[var(--cc-primary)] text-white py-2 px-4 rounded hover:bg-[var(--cc-primary)] font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {loading && (
                <div className="text-center text-sm text-gray-500 py-2">
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-[var(--cc-primary)] rounded-full"></span>
                  <p className="mt-2">Creating account...</p>
                </div>
              )}
            </form>

            <p className="mt-6 mb-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="auth?type=login"
                className="text-[var(--cc-primary)] hover:text-[var(--cc-primary)] font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
