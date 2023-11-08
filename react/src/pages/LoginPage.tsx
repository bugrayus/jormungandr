import "../index.css";
import { useState } from "react";
import { UsersService, LoginUserModel } from "../swagger/api";
import { initOpenApi } from "../utils/api-helper";
import { ToastContainer } from "react-toastify";
import logo from "../assets/logo.png";

export default function LoginPage() {
  initOpenApi();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    UsersService.postApiUsersAuthenticate({
      password: password,
      username: username,
    }).then((e) => {
      sessionStorage.setItem("token", e.token!);
      window.location.href = "/";
    });
  };
  return (
    // <>
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-md-6">
    //         <div className="card">
    //           <div className="card-body">
    //             <h2 className="card-title">Giriş Yap</h2>
    //             <form>
    //               <div className="mb-3">
    //                 <label htmlFor="username" className="form-label">
    //                   Kullanıcı Adı
    //                 </label>
    //                 <input
    //                   type="text"
    //                   className="form-control"
    //                   id="username"
    //                   value={username}
    //                   onChange={handleUsernameChange}
    //                 />
    //               </div>
    //               <div className="mb-3">
    //                 <label htmlFor="password" className="form-label">
    //                   Şifre
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="form-control"
    //                   id="password"
    //                   value={password}
    //                   onChange={handlePasswordChange}
    //                 />
    //               </div>
    //               <button
    //                 type="button"
    //                 className="btn btn-primary"
    //                 onClick={handleLogin}
    //               >
    //                 Giriş Yap
    //               </button>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <ToastContainer />
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src={logo} width={150} className="mx-auto" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
