import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import lock from "../images/lock.png";
import ProductCard from "./ProductCard";
import googleImage from "../images/google.png";
import jwtImage from "../images/jwt.png";
import reactImage from "../images/react.png";

const Homepage = () => {
  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-white h-[100vh] rounded-br-2xl">
      <nav className="p-4 rounded-xl shadow-2xl bg-black/10 shadow-black text-[1.5rem] sticky top-5 z-50">
        <ul className="space-x-[5rem] flex items-center justify-evenly">
          <li className="flex items-center space-x-2">
            <img
              src={lock}
              alt="Auth"
              className="w-[2rem] h-[2rem] rounded-full"
            />
            <h1 className="font-bold text-black font-londrina">Auth</h1>
          </li>
          <div className="flex space-x-7">
            <li>
              <Link to="/login" className="text-xl hover:text-white">
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="text-[1.5rem]"
                />
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-xl hover:text-white">
                <FontAwesomeIcon icon={faUser} className="text-[1.5rem]" />
              </Link>
            </li>
            <li>
              <a href="#hero" className="text-xl hover:text-white">
                <FontAwesomeIcon icon={faQuestion} className="text-[1.5rem]" />
              </a>
            </li>
          </div>
        </ul>
      </nav>

      <section className="flex items-center justify-center h-[100vh]">
        <div className="text-center text-[4rem] bg-black/10 p-4 rounded-xl shadow-sm shadow-white">
          <h1 className="text-[4rem] text-black font-bolder mb-4">
            Welcome to Auth
          </h1>
        </div>
      </section>

      <section
        id="hero"
        className="flex items-center justify-center h-screen text-4xl flex-col m-[3rem] space-y-10"
      >
        <h1 className="text-black rounded-lg font-londrina font-semibold">
          Auth
        </h1>
        <p className="text-black rounded-lg font-londrina font-semibold">
          A secure and user-friendly authentication practice site Made with...
        </p>
        <section className="flex items-center justify-center">
          <ProductCard
            imageSrc={googleImage}
            description="Google Auth Services"
          />
          <ProductCard imageSrc={jwtImage} description="Json Web Token" />
          <ProductCard imageSrc={reactImage} description="React Library" />
        </section>
      </section>
      <footer className="flex items-center justify-center mb-10">
        <p className="text-black text-3xl rounded-lg font-londrina font-light">
          Copyright &copy; 2024 Auth
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
