import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { RoleState } from "../stores/reducers/roleReducer";

export default function Navbar() {
  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [userRole, setUserRole] = useState("");

  const parseToken = (token: string): { role: string } | null => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return {
        role: decodedToken.role,
      };
    } catch (error) {
      return null;
    }
  };
  const role = useSelector((state: RoleState) => state.role);
  console.log(role);
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }

    if (token) {
      const user = parseToken(token);
      setUserRole(user!.role);
    }
  }, []);

  return (
    <div>
      <div className="w-full px-8 xl:px-0 xl:w-8/12 md:m-auto h-[90px] flex justify-between items-center select-none">
        <div className="flex gap-2 items-center" id="down">
          <img src={logo} alt="logo" className="w-[115px] sm:w-[100px]" />
        </div>
        <ul className="hidden lg:flex gap-3 items-center" id="down">
          {/* <li className="hover:text-[#ebebeb] text-xl">
            <Link to={`/`}>HOME</Link>
          </li> */}
          <li className="hover:text-[#ebebeb] text-xl">{role}</li>
          <li className="hover:text-[#ebebeb] text-xl">
            {" "}
            <Link to={`/`}>LESSON</Link>{" "}
          </li>
          {userRole == "Admin" ? (
            <li className="hover:text-[#ebebeb] text-xl">
              {" "}
              <Link to={`/user`}>USER</Link>{" "}
            </li>
          ) : null}
          <li className="hover:text-[#9f0000] text-xl text-[#ff0000]">
            {" "}
            <Link onClick={logout} to={`http://localhost:3000/login`}>
              LOGOUT
            </Link>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
