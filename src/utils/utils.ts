import axios, { Method } from "axios";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";

// export const url = "http://localhost:5500";
export const url = "https://bordable-backend.onrender.com";
// export const url = process.env["URL"]
export const token: string | null = (typeof window !== 'undefined') ? localStorage.getItem("token") : null;





export const initialFormData = {
  username: "",
  password: "",
};

export const InitialBoardData = {
  title: "",
  color: "",
};

export const InitialtableData = {
  title: "",
};

export async function handleAxios(
  petitionType: Method,
  path: string,
  formData?: {}
) {
  const result = await axios.request({
    method: petitionType,
    url: url + path,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return result;
}
export function getParams(searchParams: ReadonlyURLSearchParams) {
  const paramObj: { [key: string]: string } = {};
  const paramsArray = searchParams.toString().split("=");
  paramObj[paramsArray[0]] = paramsArray[1];
  return paramObj;
}


