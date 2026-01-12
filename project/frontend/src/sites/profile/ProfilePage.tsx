import UserPage from "./UserPage";
import NotLoggedInPage from "./NotLoggedInPage";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await fetch("http://localhost:3002/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error(e);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full flex-grow">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return <>{isLoggedIn ? <UserPage /> : <NotLoggedInPage />}</>;
}

export default ProfilePage;
