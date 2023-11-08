import "../index.css";
import {
  LessonStudentResponseModel,
  UsersService,
  ApplicationUserResponseModel,
  LessonStudentService,
} from "../swagger/api";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../stores/actions/roleActions";

export default function AssignLessonStudentPage() {
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
  const { lessonId } = useParams<string>();
  const [tableItems, setTableItems] = useState<
    LessonStudentResponseModel[] | null
  >(null);
  const [userRole, setUserRole] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>();
  const [midtermScore, setMidtermScore] = useState();
  const [finalScore, setFinalScore] = useState();
  const [makeupScore, setMakeupScore] = useState();
  const [students, setStudents] = useState<
    ApplicationUserResponseModel[] | null
  >(null);
  const dispatch = useDispatch();
  const updateScoreModalOpen = (id: string) => {
    dispatch(set("State Update Score Tarafindan Degisti"));
    LessonStudentService.getApiLessonStudents1(id).then((e) => {
      setMidtermScore(e.midterm == null ? null : (e.midterm as any));
      setFinalScore(e.final == null ? null : (e.final as any));
      setMakeupScore(e.makeup == null ? null : (e.makeup as any));
    });
  };
  const handleStudentSelectChange = (event: any) => {
    const id = event.target.value;
    setSelectedStudentId(id);
  };
  const handleMidtermScoreChange = (event: any) => {
    const id = event.target.value;
    setMidtermScore(id == "" ? null : id);
  };
  const handleFinalScoreChange = (event: any) => {
    const id = event.target.value;
    setFinalScore(id == "" ? null : id);
  };
  const handleMakeupScoreChange = (event: any) => {
    const id = event.target.value;
    setMakeupScore(id == "" ? null : id);
  };
  const saveUpdateScoreModal = (id: string) => {
    LessonStudentService.putApiLessonStudentsScore(id, {
      final: finalScore,
      makeup: makeupScore,
      midterm: midtermScore,
    })
      .then(() => {
        LessonStudentService.getApiLessonStudentsByLesson(lessonId!).then(
          (e) => {
            setTableItems(e);
          }
        );
      })
      .catch((e) => {});
  };
  const saveCreateModal = () => {
    LessonStudentService.postApiLessonStudents({
      lessonId: lessonId,
      studentId: selectedStudentId,
    })
      .then(() => {
        LessonStudentService.getApiLessonStudentsByLesson(lessonId!).then(
          (e) => {
            setTableItems(e);
          }
        );
      })
      .catch((e) => {});
    setSelectedStudentId("");
  };
  const deleteLessonStudent = (id: string) => {
    LessonStudentService.deleteApiLessonStudents(id).then((e) => {
      LessonStudentService.getApiLessonStudentsByLesson(lessonId!).then((e) => {
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
      if (user!.role == "Admin") {
        UsersService.getApiUsersByRole("Student").then((e) => {
          setStudents(e);
        });
      }
      if (user!.role == "Student") {
        window.location.href = "/";
      }
    }

    LessonStudentService.getApiLessonStudentsByLesson(lessonId!).then((e) => {
      setTableItems(e);
    });
  }, []);
  return (
    <>
      <div className="w-full px-8 xl:px-0 xl:w-8/12 md:m-auto md:mt-12 ">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Assigned Students
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            {userRole == "Admin" ? (
              <Dialog.Root>
                <Dialog.Trigger
                  className="w-32 mx-auto py-2 ml-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center"
                  onClick={() =>
                    dispatch(set("State Assign Student Tarafindan Degisti"))
                  }
                >
                  Assign Student
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                  <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    <div className="bg-white rounded-md shadow-lg">
                      <div className="flex items-center justify-between p-4 border-b">
                        <Dialog.Title className="text-lg font-medium text-gray-800 ">
                          Assign Student
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
                            value={selectedStudentId}
                            onChange={handleStudentSelectChange}
                          >
                            <option value="">Select student</option>
                            {students?.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.userName}
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
                <th className="py-3 px-6">Student User Name</th>
                <th className="py-3 px-6">Lesson Name</th>
                <th className="py-3 px-6">Midterm Score</th>
                <th className="py-3 px-6">Final Score</th>
                <th className="py-3 px-6">Makeup Score</th>

                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {tableItems?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.studentUserName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.lessonName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.midterm}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.final}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.makeup}</td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <Dialog.Root>
                      <Dialog.Trigger
                        onClick={() => updateScoreModalOpen(item.id!)}
                        className="py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Update Score
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                          <div className="bg-white rounded-md shadow-lg">
                            <div className="flex items-center justify-between p-4 border-b">
                              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                                Update Score
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
                                    placeholder="Midterm"
                                    id="username"
                                    className="w-full p-2.5 ml-2 bg-transparent outline-none"
                                    value={
                                      midtermScore == null ? "" : midtermScore
                                    }
                                    onChange={handleMidtermScoreChange}
                                  />
                                </div>
                              </div>
                              <div className="relative w-72 max-w-full mx-auto">
                                <div className="flex items-center text-gray-400 border rounded-md">
                                  <input
                                    type="text"
                                    placeholder="Final"
                                    id="username"
                                    className="w-full p-2.5 ml-2 bg-transparent outline-none"
                                    value={finalScore == null ? "" : finalScore}
                                    onChange={handleFinalScoreChange}
                                  />
                                </div>
                              </div>
                              <div className="relative w-72 max-w-full mx-auto">
                                <div className="flex items-center text-gray-400 border rounded-md">
                                  <input
                                    type="text"
                                    placeholder="Makeup"
                                    id="username"
                                    className="w-full p-2.5 ml-2 bg-transparent outline-none"
                                    value={
                                      makeupScore == null ? "" : makeupScore
                                    }
                                    onChange={handleMakeupScoreChange}
                                  />
                                </div>
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
                                  onClick={() => saveUpdateScoreModal(item.id!)}
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
                    {userRole == "Admin" ? (
                      <button
                        onClick={() => deleteLessonStudent(item.id!)}
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
