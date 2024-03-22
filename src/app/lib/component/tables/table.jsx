"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { InitialtableData, token, url } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import { OptionsTable } from "./options";

export default function Table({ title, id, children, height }) {
  const [hidden, setHidden] = useState("hidden");
  const [formData, setFormData] = useState(InitialtableData);
  const searchParams = useSearchParams();

  const paramObj = {
    [searchParams.toString().split("=")[0]]: searchParams
      .toString()
      .split("=")[1],
  };

  function handleChange(event) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  const handleShow = async () => {
    if (hidden == "hidden") {
      setHidden("");
    } else if (hidden === "") {
      setHidden("hidden");
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        url + `/board/${paramObj.id}/table/${id}/new-card`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // window.location.reload();
    } catch (error) {
      console.error("Error creating new table:", error);
    }
  };

  const [dataEx, setTitle] = useState(title);

  async function handleUpdate() {
    const pathTable = `/board/${paramObj.id}/table/${id}`;

    try {
      const result = await axios.patch(
        url + pathTable,
        { title: dataEx },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result.data);
      setTitle(result.data.data.title);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid h-fit">
      <section
        className={`rounded-md w-72  p-2 grid   gap-2 bg-[#F5F5F5]`}
        // style={{ height: height }}
      >
        <div className="flex justify-between items-center text-lg font-bold py-1.5">
          {/* title */}
          <h1 className="  text-xl h-[28px] font-bold text-center">{title}</h1>
          <button onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                stroke="#525252"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                stroke="#525252"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                stroke="#525252"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <form className={`flex w-full gap-1 box-content ${hidden}`}>
          <input onChange={(e) => setTitle(e.target.value)} type="text" />
          <button
            className="h-full w-7 rounded-md bg-violet-400"
            type="button"
            onClick={handleUpdate}
          >
            👍
          </button>
        </form>
        <OptionsTable hidden={true} id={id} />
        {children}

        {/* //* add card */}
        <button onClick={handleShow} className="text-left">
          + Add a card
        </button>
      </section>
      <form
        onSubmit={handleCreate}
        method="post"
        className={`border grid bg-[#F5F5F5] p-2 gap-2 w-full ${hidden}`}
      >
        <label htmlFor="title">Card Title</label>
        <input
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
          placeholder="Title"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className=" rounded-md h-9 bg-violet-700 text-white p-2"
          >
            Add card
          </button>

          <button
            onChange={handleShow}
            className=" rounded-md h-9 bg-violet-700 text-white p-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
