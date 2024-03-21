import axios, { Method } from "axios";
import {  ReadonlyURLSearchParams,  redirect } from "next/navigation";


export const url = "http://localhost:5500";
export const token: string | null = sessionStorage.getItem("token");

export async function UseVerifyUser() {

  if (!token) {
    return redirect('/login');
  } else {

    const response = await axios.get(url +'/account',  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.data.ok) {
      // Si la verificación del token falla, redirige al usuario a la página de inicio de sesión
      console.log("Unauthorized");
      redirect('/login');
    }
  }
}





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

// export const token: string | null = sessionStorage.getItem("token");

// ----------tables-----------------
// edit table
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

/* //* function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = event.target;
  const nextFormData = { ...formData, [name]: value };
  setFormData(nextFormData);
}
*/