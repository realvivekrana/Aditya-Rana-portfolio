import { Link } from "react-router-dom";

const Home = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
    <h1 className="text-4xl font-bold">Aditya Rana</h1>
    <p className="text-slate-500">Portfolio coming soon...</p>
    <Link to="/admin/login" className="text-primary underline">
      Admin Login
    </Link>
  </div>
);

export default Home;