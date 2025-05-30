import { Link } from "react-router-dom";

export default function NotFound() {
  document.title = "Oops | Portfolio";

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
