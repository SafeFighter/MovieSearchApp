import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta
          name="description"
          content="The page you are looking for does not exist."
        />
      </Helmet>

      <main style={{ textAlign: "center", padding: "2rem" }}>
        <h1>404</h1>
        <p>Oops! This page doesn’t exist.</p>
        <Link to="/">Go back home</Link>
      </main>
    </>
  );
}

export default NotFound;
