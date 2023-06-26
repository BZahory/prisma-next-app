import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "../types/sql";

export default function useSessionUser() {
  const sessionUser = useSession().data?.user;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (sessionUser?.accessToken) {
    headers.append("Authorization", sessionUser.accessToken);
  }

  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${sessionUser?.username}`, {
      method: "GET",
      headers,
    }).then(async (res) => {
      setUser(await res.json());
    });
  }, [sessionUser]);

  return user;
}
