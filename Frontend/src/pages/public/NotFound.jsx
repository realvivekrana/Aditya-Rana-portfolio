import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
    <h1 className="text-6xl font-bold text-primary">404</h1>
    <p className="text-slate-500">Sorry, we could not find that page.</p>
    <Link to="/" className="rounded-lg bg-primary px-5 py-2 text-white">
      Go Home
    </Link>
  </div>
);

export default NotFound;