"use client";
import React, { useState } from "react";
import axios from "axios";
import { InitialtableData, token, url } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import { useDrop } from "react-dnd";

export default function Table({ title, id, children, height }) {
  const [hidden, setHidden] = useState("hidden");
  const [hiddenO, setHiddenO] = useState("hidden");
  const [hiddenT, setHiddenT] = useState("");
  const [hiddenB, setHiddenB] = useState("hidden");
  const [formData, setFormData] = useState(InitialtableData);
  const searchParams = useSearchParams();

  const [, dropRef] = useDrop({
    accept: "card",
    drop: async (item, monitor) => {
      const cardId = item.id;
      try {
        await axios.patch(
          url + `/card/${cardId}/new-table/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error(`Error updating card ${cardId}:`, error);
      }
    },
  });

  const paramObj = {
    [searchParams.toString().split("=")[0]]: searchParams
      .toString()
      .split("=")[1],
  };
  const pathTable = `/board/${paramObj.id}/table/${id}`;

  function handleChange(event) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  const handleShowNewCard = async () => {
    hidden === "hidden" ? setHidden("") : setHidden("hidden");
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
      hidden === "hidden" ? setHidden("") : setHidden("hidden");
    } catch (error) {
      console.error("Error creating new table:", error);
    }
  };

  const [dataEx, setTitle] = useState(title);

  const form = {
    title: dataEx,
  };
  function handleShowOption() {
    hiddenO === "hidden" ? setHiddenO("") : setHiddenO("hidden");
  }

  async function handleDelete() {
    try {
      const result = await axios.delete(url + pathTable, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    try {
      await axios.patch(url + pathTable, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      hiddenT === "" ? setHiddenT("hidden") : setHiddenT("");
      hiddenB === "hidden" ? setHiddenB("") : setHiddenB("hidden");
      hiddenO === "hidden" ? setHiddenO("") : setHiddenO("hidden");
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowUpdate = async () => {
    hiddenT === "" ? setHiddenT("hidden") : setHiddenT("");
    hiddenB === "hidden" ? setHiddenB("") : setHiddenB("hidden");
  };

  return (
    <div className="relative">
      <div className="grid h-fit" ref={dropRef}>
        <section className={`rounded-md w-72  p-2 grid   gap-2 bg-[#F5F5F5]`}>
          <div className="flex justify-between items-center text-lg font-bold py-1.5">
            {/* title */}
            <h1
              className={`  text-xl h-[28px] font-bold text-center ${hiddenT}`}
            >
              {title}
            </h1>

            <button onClick={handleShowOption}>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                  stroke="#525252"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                  stroke="#525252"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <form className={` w-full  box-content ${hiddenB}`}>
            <textarea
              className="h-12 resize-none"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>

          {children}

          {/* //* add card */}
          <button onClick={handleShowNewCard} className="text-left">
            + Add a card
          </button>
        </section>
        <form className={`border grid bg-[#F5F5F5] p-2 gap-2 w-full ${hidden}`}>
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
              onClick={handleCreate}
              className=" rounded-md h-9 bg-violet-700 text-white p-2"
            >
              Add card
            </button>
          </div>
        </form>
      </div>
      <article
        className={`w-24 rounded-md bg-[#f5f5f5] border border-dark hover box-border p-1 absolute top-[-32px] right-[26px] ${hiddenO}`}
      >
        <section>
          <button
            className="w-full font-semibold p-1 rounded text-start hover:bg-[#D9D9D9]"
            type="submit"
            onClick={handleShowUpdate}
          >
            Edit
          </button>
          <div></div>
          <button
            type="button"
            className="w-full font-semibold text-start p-1 rounded hover:bg-[#D9D9D9]"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className={`w-full font-semibold text-start p-1 rounded hover:bg-[#D9D9D9] ${hiddenB}`}
            onClick={handleUpdate}
          >
            Update
          </button>
        </section>
      </article>
    </div>
  );
}
