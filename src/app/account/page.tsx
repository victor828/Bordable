"use client";
import { useEffect, useState } from "react";
import { Header } from "../lib/component/header";
import { inter } from "../lib/ui/fonts";
import axios from "axios";
import { token, url } from "@/utils/utils";
import { redirect } from "next/navigation";
import { setTimeout } from "timers";

type FormData = {
  username?: string;
  name: string | undefined;
  email: string | undefined;
  ok?: boolean;
};

export default function Account() {
  const [error, setError] = useState("");
  const [succes, setSucces] = useState(false);

  const [data, setData] = useState<FormData | null>(null);
  useEffect(() => {
    token ?? redirect("/login");
    fetchData();
  }, [error, succes]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  const fetchData = async () => {
    try {
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
      setSucces(responseCards.data.ok);
      setData(responseCards.data.data);
      setError(responseCards.data.data.message.detail);
      setTimeout(() => {
        setError("");
        setSucces(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.delete(url + `/delete-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
          {succes === true && error ? (
            <p className="hidden"></p>
          ) : succes === true ? (
            <p className="bg-green-400 text-center rounded-md p-2">
              The data is updated
            </p>
          ) : (
            <p className="hidden"></p>
          )}
          <button className="btnL" onClick={deleteAccount}>
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
