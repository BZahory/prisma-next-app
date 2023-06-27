import Header from "@/components/Header";
import { BUTTON_CLASSES } from "@/lib/constants";
import { signIn as nextAuthSignIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Input from "../../components/Input";

// handles both login and sign-up
export default function Login() {
  const isSessionUser = Boolean(useSession().data?.user);

  const { push: navigate } = useRouter();

  if (isSessionUser) {
    navigate("/puzzles");
  }

  const [isSigningUp, setIsSigningUp] = useState(false);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signIn = () =>
    nextAuthSignIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/puzzles",
    });

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSigningUp) {
      const user = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (user) {
        signIn();
      }
    } else {
      signIn();
    }
  };

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col h-full gap-y-10 justify-center items-center">
        <Image src="/logo.png" alt="logo" className="w-16 sm:w-20" />

        <div
          className={`flex flex-col w-3/4 sm:w-1/2 bg-white rounded-xl overflow-hidden divide-y border [&>*]:p-4`}
        >
          <h1 className="text-2xl w-full text-center">
            Welcome{!isSigningUp && " back"}!
          </h1>
          <div className="bg-gray-100">
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              {isSigningUp && (
                <Input
                  required={isSigningUp}
                  type="email"
                  placeholder="Email"
                  handleChange={setEmail}
                  value={email}
                />
              )}
              <Input
                required
                placeholder="Username"
                type="text"
                value={username}
                handleChange={setUserName}
              />
              <Input
                required
                placeholder="Password"
                type="password"
                value={password}
                handleChange={setPassword}
              />
              <Input
                type="submit"
                value={isSigningUp ? "Sign Up" : "Login"}
                className={BUTTON_CLASSES}
              />
            </form>
          </div>
          <button
            className="text-blue-500 underline p-4"
            onClick={() => setIsSigningUp(!isSigningUp)}
          >
            {isSigningUp ? "Already" : "Don't"} have an account?
          </button>
        </div>
      </div>
    </main>
  );
}
