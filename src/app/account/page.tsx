"use client";
import { useEffect, useState } from "react";
import { Header } from "../lib/component/header";
import { inter } from "../lib/ui/fonts";
import axios from "axios";
import { UseVerifyUser, token, url } from "@/utils/utils";

export default function Account() {
  useEffect(() => {
    UseVerifyUser();
    fetchData();
  }, []);

  const [data, setData] = useState<any>(null);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }
  console.log(formData);
  console.log(data);

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
      console.log(responseCards.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(responseCards);
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
                disabled
                type="text"
                placeholder={data.username || ""}
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
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <input
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
          <button className="btnL">Delete my account</button>
        </div>
      </div>
    </div>
  );
}
