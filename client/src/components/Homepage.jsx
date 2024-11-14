import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  return (
    <div className=" bg-transparent sticky m-[2rem] ">
      <nav className="bg-white p-4 rounded-xl shadow-2xl shadow-black text-[1.5rem] ">
        <ul className="space-x-[5rem] flex items-center justify-evenly">
          <li>
            <h1 className="font-bold text-gray-500">Auth</h1>
          </li>
          <div className="flex space-x-7">
            <li>
              <Link to="/" className="text-[1.5rem]">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-xl">
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="text-[1.5rem]"
                />
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;
