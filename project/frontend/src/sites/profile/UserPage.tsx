import UserInfo from "./UserInfo";

export default function UserPage() {
  return (
    <div className="w-full flex flex-row items-center justify-around bg-primary p-10 min-h-[calc(100vh-65px)]">
      <UserInfo />
      {/* <UserOrders /> */}
    </div>
  );
}
