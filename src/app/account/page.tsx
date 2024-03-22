"use client";
import { useEffect, useState } from "react";
import { Header } from "../lib/component/header";
import { inter } from "../lib/ui/fonts";
import axios from "axios";
import { token, url } from "@/utils/utils";
// todo: Seguir arreglando el cambio de estado para name y email

type FormData = {
  username?: string;
  name: string | undefined;
  email: string | undefined;
  ok?: boolean;
};

export default function Account() {
  const [data, setData] = useState<FormData | null>(null);
  useEffect(() => {
    fetchData();
  }, [data]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(String);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const responseCards = await axios.get(url + `/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(responseCards.data.data);
      setName(responseCards.data.data.name);
      setEmail(responseCards.data.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    name: data?.name,
    email: data?.email,
  });

  const fetchUpdate = async () => {
    try {
      const responseCards = await axios.patch(
        url + `/account/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData(responseCards.data.data);
      console.log(responseCards.data.ok);

      setError(responseCards.data.data.message.detail);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <Header />
      <div className="content h-full">
        <h1 className={`${inter.className} text-2xl font-bold`}>My Account</h1>
        <div className="w-80 m-auto grid gap-4 ">
          {/* form */}
          <form className="grid gap-4 ">
            <div className="form_input">
              <label htmlFor="username">Username</label>
              <input
                className="border-[tomato]"
                disabled
                type="text"
                value={data?.username}
                placeholder={data?.username || "user"}
                id="username"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                defaultValue={name}
                placeholder={name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                defaultValue={email}
                placeholder={email}
                onChange={handleChange}
                name="email"
              />
              {!error ? (
                <p></p>
              ) : (
                <p className="bg-[tomato] rounded-md px-2">
                  The email are exist, chose other please
                </p>
              )}
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <input
                disabled
                className="border-[tomato]"
                placeholder="password"
                type="password"
                id="password"
                onChange={handleChange}
                name="password"
              />
            </div>
            <button className="btnL" type="button" onClick={fetchUpdate}>
              Update
            </button>
          </form>
          {data?.ok === undefined ? (
            <p className="hidden"></p>
          ) : data.ok === true ? (
            <p>The data is updated</p>
          ) : (
            <p>error</p>
          )}
          <button className="btnL">Delete my account</button>
        </div>
      </div>
    </div>
  );
}
