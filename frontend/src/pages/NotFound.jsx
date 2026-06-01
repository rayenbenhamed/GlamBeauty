import { Link } from "react-router-dom";
import Button from "@/components/ui/button.jsx";

const NotFound = () => {
  return (
    <main className="section-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-5xl text-ink">404</h1>
      <p className="mt-4 text-sm text-ink/70">The page you are looking for is not available.</p>
      <Button className="mt-6" asChild>
        <Link to="/">Return home</Link>
      </Button>
    </main>
  );
};

export default NotFound;
