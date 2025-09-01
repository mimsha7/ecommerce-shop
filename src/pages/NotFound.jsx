import { Header } from "../components/Header";
import notFoundImage from "../../public/not-found.png";

export const NotFound = () => {
  return (
    <>
      <title>Page Not Found</title>
      <link rel="icon" href="home-favicon.png" />
      <Header />
      <div className="not-found-container">
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-message">Sorry, the page you're looking for doesn't exist.</p>
        <img src={notFoundImage} alt="Not Found" className="not-found-page" />
      </div>
    </>
  );
};
