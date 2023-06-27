import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "../types/sql";
import { createAuthHeader } from "../utils/auth";

export default function useDatabaseUser() {
  const sessionUser = useSession().data?.user;

  const headers = createAuthHeader(sessionUser?.accessToken);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (sessionUser) {
      fetch(`http://localhost:3000/api/user/${sessionUser.username}`, {
        method: "GET",
        headers,
      }).then(async (res) => {
        const newUser = await res.json();
        if (newUser) setUser(newUser);
      });
    }
  }, [sessionUser, headers]);

  return user;
}
