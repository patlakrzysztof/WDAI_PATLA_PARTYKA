import UserInfo from "./UserInfo";
import UserOrders from "./UserOrders";

export default function UserPage() {
  return (
    <div
      className="w-full 
    flex flex-col items-center justify-evenly 
    bg-background p-10 
    min-h-[calc(100vh-65px)] gap-10
    lg:flex-row lg:items-start"
    >
      <UserInfo />
      <UserOrders />
    </div>
  );
}
