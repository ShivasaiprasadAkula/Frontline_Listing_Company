import { React, useEffect} from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
      document.title = "Home";
    }, []);
  return (
    <div className="relative bg-gray-100 h-screen flex flex-col justify-center items-center text-center px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/entrepreneurs-meeting-office.jpg)" }}
      ></div>
      <div className="relative z-10 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Welcome to Frontline EduTech</h1>
        <p className="mb-6 text-lg sm:text-2xl">List your company and reach thousands of users!</p>
        <Link
          to="/companies/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
        >
          List Your Company
        </Link>
      </div>
    </div>
  );
}

export default Home;
