import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";

export default function NotLoggedInPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-20 py-20 lg:flex-row">
      <LogInForm />
      <RegisterForm />
    </div>
  );
}
