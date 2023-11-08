import axios from "axios";
import { OpenAPI } from "../swagger/api";
import { toast } from "react-toastify";

export function initOpenApi() {
  OpenAPI.BASE = "https://localhost:44343";
  OpenAPI.TOKEN = sessionStorage.getItem("token")!;
  OpenAPI.HEADERS = {
    "Access-Control-Allow-Origin": "*",
  };

  // axios.interceptors.request.use((config) => {
  //   config.headers["Access-Control-Allow-Origin"] = "*";
  //   return config;
  // });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      exceptionHandler(error);
      return error;
    }
  );
}

function exceptionHandler(error: any) {
  if (error.response) {
    if (error.response.status === 401) {
      window.location.href = "/login";
    } else if (error.response.status === 403) {
      window.location.href = "/";
    } else {
      let errorMessage = "Bir hata oluştu.";

      try {
        if (error.response.data && error.response.data.errors) {
          errorMessage = error.response.data.errors.join(",");
        } else if (error.response.data && error.response.data.Errors) {
          errorMessage = error.response.data.Errors.join(",");
        }
      } catch (e) {
        console.log(e);
      }
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }
}
