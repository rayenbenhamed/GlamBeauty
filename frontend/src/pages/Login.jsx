import Button from "@/components/ui/button.jsx";
import Input from "@/components/ui/input.jsx";

const Login = () => {
  return (
    <main className="section-shell py-20">
      <div className="mx-auto max-w-md glass-panel p-8">
        <h1 className="font-display text-3xl text-ink">Welcome back</h1>
        <p className="mt-3 text-sm text-ink/70">Sign in to manage your bookings.</p>
        <form className="mt-8 space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Login</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
