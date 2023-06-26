import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  className?: string;
}

export default function SignInButton({ className }: Props) {
  const { pathname: currentPath } = useRouter();

  const session = useSession();

  const isSignedIn = Boolean(session.data?.user);

  return (
    <Link
      className={className}
      onClick={() => (isSignedIn ? signOut() : {})}
      href={!isSignedIn ? "/login" : currentPath}
    >
      {isSignedIn ? "Sign Out" : "Sign In"}
    </Link>
  );
}
