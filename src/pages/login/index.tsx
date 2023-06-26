import Header from "@/components/Header";
import React, { useState } from "react";
import Input from "../../components/Input";

interface Props {}

// handles both login and sign-up
export default function Login({}: Props) {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // TODO: reference API here
  };

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col h-full gap-y-10 justify-center items-center">
        <img src="/logo.png" alt="logo" className="w-16 sm:w-20" />

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
                value={userName}
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
                className="bg-blue-500 hover:bg-opacity-90 text-white rounded-full w-1/2 self-center p-2 cursor-pointer"
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
