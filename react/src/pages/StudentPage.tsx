import "../index.css";
import {
  LessonService,
  LessonStudentResponseModel,
  UsersService,
  ApplicationUserResponseModel,
  LessonStudentService,
} from "../swagger/api";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useParams } from "react-router-dom";
export default function StudentPage() {
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
    LessonStudentResponseModel[] | null
  >(null);
  const [userRole, setUserRole] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState();
  const [midtermScore, setMidtermScore] = useState();
  const [finalScore, setFinalScore] = useState();
  const [makeupScore, setMakeupScore] = useState();
  const [students, setStudents] = useState<
    ApplicationUserResponseModel[] | null
  >(null);

  const updateScoreModalOpen = (id: string) => {
    LessonStudentService.getApiLessonStudents1(id).then((e) => {
      setMidtermScore(e.midterm == null ? 0 : (e.midterm as any));
      setFinalScore(e.final == null ? 0 : (e.final as any));
      setMakeupScore(e.makeup == null ? 0 : (e.makeup as any));
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
        LessonStudentService.getApiLessonStudentsByUser().then((e) => {
          setTableItems(e);
        });
      })
      .catch((e) => {});
  };
  const saveCreateModal = () => {};
  const deleteLessonStudent = (id: string) => {
    LessonStudentService.deleteApiLessonStudents(id).then((e) => {
      LessonStudentService.getApiLessonStudentsByUser().then((e) => {
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
    }

    LessonStudentService.getApiLessonStudentsByUser().then((e) => {
      setTableItems(e);
    });
  }, []);
  return (
    <>
      <div className="w-full px-8 xl:px-0 xl:w-8/12 md:m-auto md:mt-12 ">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Scores
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
