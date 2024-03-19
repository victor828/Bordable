import axios, { Method } from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation'


export const url = "http://localhost:5500";

export async function UseVerifyUser() {
  const router = useRouter()

  // Obtén el token del almacenamiento de sesión
  const token = sessionStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige al usuario a la página de inicio de sesión
    router.push('/login');
    return;
  }

  try {
    // Haz una solicitud al backend para verificar el token
    const response = await axios.post('/api/verify-token', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.data.success) {
      // Si la verificación del token falla, redirige al usuario a la página de inicio de sesión
      router.push('/login');
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    router.push('/login');
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
export const token: string | null = sessionStorage.getItem("token");

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



function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = event.target;
  const nextFormData = { ...formData, [name]: value };
  setFormData(nextFormData);
}
// console.log(formData);
const serverUrl: string = "/login";
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  try {
    //!
    const response = await axios.post(url + serverUrl, formData);
    //*
    const response2 = response.data.data;
    const resMessge = response2.message;
    const token = response.data.data.token;
    /*
    // console.log(response);
    // console.log(token);
    // console.log(userName);
    // console.log(resMessge);
    // console.log(resData);
    // console.log(response2);
    // console.log(responseOk);
    // sessionStorage.setItem("token", token);
    */
    sessionStorage.setItem("token", token);

    setResponse2(response2);
    setResponseMessage(resMessge);
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}