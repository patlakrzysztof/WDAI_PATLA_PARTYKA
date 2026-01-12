import UserPage from "./UserPage";
import NotLoggedInPage from "./NotLoggedInPage";
import { useEffect, useState } from "react";

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await fetch("http://localhost:3002/users/me", {
          credentials: "include",
        });
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkUserStatus();
  }, []);

  return <>{isLoggedIn ? <UserPage /> : <NotLoggedInPage />}</>;
}

export default ProfilePage;
