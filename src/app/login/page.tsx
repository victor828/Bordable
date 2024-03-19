"use client";
import { familjen } from "@/app/lib/ui/fonts";
import Link from "next/link";
import { initialFormData, token, url } from "@/utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Home() {
  const [responseMessage, setResponseMessage] = useState("");
  const [response2, setResponse2] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  const serverUrl: string = "/login";
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post(url + serverUrl, formData);
      const response2 = response.data.data;
      const resMessge = response2.message;
      const token = response.data.data.token;

      sessionStorage.setItem("token", token);

      setResponse2(response2);
      setResponseMessage(resMessge);
    } catch (error) {
      console.error("Error to process the request:", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center  font-mono text-sm grid justify-center gap-4 ">
        {/* logo */}
        <div className="grid m-auto gap-8 w-80">
          <div>
            <svg
              className="m-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
            >
              <path
                d="M0 11.52C0 5.15768 5.15768 0 11.52 0H84.48C90.8423 0 96 5.15768 96 11.52V84.48C96 90.8423 90.8423 96 84.48 96H11.52C5.15768 96 0 90.8423 0 84.48V11.52Z"
                fill="#6D28D9"
              />
              <path
                d="M62.2933 17.92C62.2933 14.621 64.9677 11.9467 68.2667 11.9467H78.5067C81.8056 11.9467 84.48 14.621 84.48 17.92V78.08C84.48 81.379 81.8056 84.0533 78.5067 84.0533H68.2667C64.9677 84.0533 62.2933 81.379 62.2933 78.08V17.92Z"
                fill="white"
              />
              <path
                d="M11.9467 17.92C11.9467 14.621 14.621 11.9467 17.92 11.9467H28.16C31.459 11.9467 34.1333 14.621 34.1333 17.92V48.2133C34.1333 51.5123 31.459 54.1867 28.16 54.1867H17.92C14.621 54.1867 11.9467 51.5123 11.9467 48.2133V17.92Z"
                fill="white"
              />
              <path
                d="M37.12 17.92C37.12 14.621 39.7944 11.9467 43.0933 11.9467H53.3333C56.6323 11.9467 59.3067 14.621 59.3067 17.92V63.1467C59.3067 66.4456 56.6323 69.12 53.3333 69.12H43.0933C39.7944 69.12 37.12 66.4456 37.12 63.1467V17.92Z"
                fill="white"
              />
            </svg>
            <h1
              className={`${familjen.className} text-pretty text-5xl text-center`}
            >
              Welcome to Boardable
            </h1>
          </div>

          {/* formulario */}
          <div className="">
            <form
              className="grid m-auto gap-4"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="form_input">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  placeholder="Username"
                  maxLength={10}
                  minLength={3}
                  pattern="[a-zA-Z0-9]+"
                  title="Only letters and numbers are allowed"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form_input">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  name="password"
                  placeholder="Password"
                  minLength={6}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btnL" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <Link className="flex justify-center link" href={"signup"}>
          <div className="flex gap-2">
            <p>create an account</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M3.83325 7.99998H13.1666M13.1666 7.99998L8.49992 3.33331M13.1666 7.99998L8.49992 12.6666"
                stroke="#6D28D9"
                stroke-width="1.33"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Link>
        <div>
          {response2 === "" ? (
            <p className="text-center">┗|｀O′|┛ </p>
          ) : !responseMessage ? (
            redirect("/")
          ) : (
            <p className="w-full bg-[tomato] rounded-md p-2">
              {responseMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
