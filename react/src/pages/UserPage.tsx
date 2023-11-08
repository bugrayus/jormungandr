import "../index.css";
import {
  LessonService,
  LessonResponseModel,
  UsersService,
  ApplicationUserResponseModel,
} from "../swagger/api";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function UserPage() {
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
  const [tableItems, setTableItems] = useState<
    ApplicationUserResponseModel[] | null
  >(null);
  const [userRole, setUserRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const roles = ["Admin", "Teacher", "Student"];
  const handleRoleSelectChange = (event: any) => {
    const id = event.target.value;
    setSelectedRole(id);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const saveCreateModal = () => {
    UsersService.postApiUsers({
      email: email,
      password: password,
      username: username,
      role: selectedRole,
    })
      .then(() => {
        UsersService.getApiUsers().then((e) => {
          setTableItems(e);
        });
      })
      .catch((e) => {});
  };
  const deleteUser = (id: string) => {
    // UsersService.(id).then((e) => {
    //   LessonService.getApiLessonsByUser().then((e) => {
    //     setTableItems(e);
    //   });
    // });
    UsersService.deleteApiUsers(id).then((e) => {
      UsersService.getApiUsers().then((e) => {
        setTableItems(e);
      });
    });
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }

    if (token) {
      const user = parseToken(token);
      setUserRole(user!.role);
    }

    UsersService.getApiUsers()
      .then((e) => {
        setTableItems(e);
      })
      .catch((e) => {});
  }, []);

  return (
    <>
      <div className="w-full px-8 xl:px-0 xl:w-8/12 md:m-auto md:mt-12 ">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Users
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            {userRole == "Admin" ? (
              <Dialog.Root>
                <Dialog.Trigger className="w-32 mx-auto py-2 ml-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
                  Add User
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                  <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    <div className="bg-white rounded-md shadow-lg">
                      <div className="flex items-center justify-between p-4 border-b">
                        <Dialog.Title className="text-lg font-medium text-gray-800 ">
                          Add User
                        </Dialog.Title>
                        <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mx-auto"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Dialog.Close>
                      </div>
                      <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                        <div className="relative w-72 max-w-full mx-auto">
                          <div className="flex items-center text-gray-400 border rounded-md">
                            <input
                              type="text"
                              placeholder="Mail"
                              id="username"
                              className="w-full p-2.5 ml-2 bg-transparent outline-none"
                              value={email}
                              onChange={handleEmailChange}
                            />
                          </div>
                        </div>

                        <div className="relative w-72 max-w-full mx-auto">
                          <div className="flex items-center text-gray-400 border rounded-md">
                            <input
                              type="password"
                              placeholder="Password"
                              id="username"
                              className="w-full p-2.5 ml-2 bg-transparent outline-none"
                              value={password}
                              onChange={handlePasswordChange}
                            />
                          </div>
                        </div>

                        <div className="relative w-72 max-w-full mx-auto">
                          <div className="flex items-center text-gray-400 border rounded-md">
                            <input
                              type="text"
                              placeholder="Username"
                              id="username"
                              className="w-full p-2.5 ml-2 bg-transparent outline-none"
                              value={username}
                              onChange={handleUsernameChange}
                            />
                          </div>
                        </div>

                        <div className="relative w-72 max-w-full mx-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <select
                            className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                            value={selectedRole}
                            onChange={handleRoleSelectChange}
                          >
                            <option value="">Select role</option>
                            {roles?.map((option, idx) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Dialog.Description>
                      <div className="flex items-center gap-3 p-4 border-t">
                        <Dialog.Close asChild>
                          <button
                            className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <button
                            onClick={saveCreateModal}
                            className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
                          >
                            Save
                          </button>
                        </Dialog.Close>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">User Name</th>
                <th className="py-3 px-6">Mail</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {tableItems?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.roles?.join(", ")}
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    {/* <Dialog.Root>
                      <Dialog.Trigger className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                        Edit
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                          <div className="bg-white rounded-md shadow-lg">
                            <div className="flex items-center justify-between p-4 border-b">
                              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                                Edit Lesson
                              </Dialog.Title>
                              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 mx-auto"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Dialog.Close>
                            </div>
                            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                              <p>
                                Commodo eget a et dignissim dignissim morbi
                                vitae, mi. Mi aliquam sit ultrices enim cursus.
                                Leo sapien, pretium duis est eu volutpat
                                interdum eu non. Odio eget nullam elit laoreet.
                                Libero at felis nam at orci venenatis rutrum
                                nunc. Etiam mattis ornare pellentesque iaculis
                                enim.
                              </p>
                              <p>
                                Felis eu non in aliquam egestas placerat. Eget
                                maecenas ornare venenatis lacus nunc, sit arcu.
                                Nam pharetra faucibus eget facilisis pulvinar eu
                                sapien turpis at. Nec aliquam aliquam blandit eu
                                ipsum.
                              </p>
                            </Dialog.Description>
                            <div className="flex items-center gap-3 p-4 border-t">
                              <Dialog.Close asChild>
                                <button className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
                                  Accept
                                </button>
                              </Dialog.Close>
                              <Dialog.Close asChild>
                                <button
                                  className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                  aria-label="Close"
                                >
                                  Cancel
                                </button>
                              </Dialog.Close>
                            </div>
                          </div>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root> */}
                    {/* <button
                      onClick={() => assignStudent(item.id!)}
                      className="py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Look Students
                    </button> */}
                    {userRole == "Admin" ? (
                      <button
                        onClick={() => deleteUser(item.id!)}
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
