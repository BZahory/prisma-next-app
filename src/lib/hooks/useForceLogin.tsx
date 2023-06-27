import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useForceLogin() {
  const { push: navigate } = useRouter();
  const session = useSession();

  useEffect(() => {
    const { status } = session;
    if (status === "unauthenticated") {
      navigate("/login");
    }
  }, [session, navigate]);
}
