import Auth from "@/components/Auth/Auth";
import Meta from "@/components/Helper/Meta";
import React from "react";

function AuthPage() {
  return (
    <div>
      <Meta
        title="Authentication"
        description="Navigate hospital care with real-time crowd insights and 7-day forecasts."
      />
      <Auth />
    </div>
  );
}

export default AuthPage;
