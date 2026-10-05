import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

// Goes to the previous page; if the user opened this page directly
// (no history), it falls back to the `to` path.
const BackButton = ({ to = "/", label = "Back", className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.key !== "default") navigate(-1);
    else navigate(to, { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-primary hover:text-primary ${className}`}
    >
      <FiArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackButton;