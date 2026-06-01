import Button from "@/components/ui/button.jsx";
import Input from "@/components/ui/input.jsx";

const Register = () => {
  return (
    <main className="section-shell py-20">
      <div className="mx-auto max-w-md glass-panel p-8">
        <h1 className="font-display text-3xl text-ink">Create an account</h1>
        <p className="mt-3 text-sm text-ink/70">
          Start your Glam Beauty journey today.
        </p>
        <form className="mt-8 space-y-4">
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Register</Button>
        </form>
      </div>
    </main>
  );
};

export default Register;
