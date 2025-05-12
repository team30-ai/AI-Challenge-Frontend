import { useRouter } from "next/router";
import Register from "./Register";
import Login from "./Login";

export default function Auth() {
  const router = useRouter();
  const { type } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center">
      {type === "register" ? (
        <Register/>
      ) : (
        <Login/>
      )}
    </div>
  );
}
