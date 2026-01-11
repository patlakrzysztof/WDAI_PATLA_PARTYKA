import UserPage from "./UserPage";
import NotLoggedInPage from "./NotLoggedInPage";

function ProfilePage() {
  const isLoggedIn = true;

  return <>{isLoggedIn ? <UserPage /> : <NotLoggedInPage />}</>;
}

export default ProfilePage;
