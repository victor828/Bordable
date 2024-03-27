"use client";
import axios from "axios";
import { BoardFinal } from "./lib/component/boards/boardFinal";
import { Header } from "./lib/component/header";
import { inter } from "./lib/ui/fonts";
import { UseVerifyUser, initialFormData, url, verifyUser } from "@/utils/utils";
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import NewBoards from "./lib/component/boards/boart";

const serverUrl = "/board";
export default function Home() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    token ?? redirect("/login");
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url + serverUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setData(response.data);
      if (!response) {
        throw new Error(`Error de red: ${response}`);
      }

      const data = response;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="content grid gap-8">
        <div className="w-40 grid gap-2">
          <h1 className={`${inter.className} text-2xl font-bold`}>My Boards</h1>
          <div>
            <p>Sort by</p>
            <select
              defaultValue={"date"}
              title="sort"
              name="sort"
              id="sort"
              className="w-full rounded-md"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8 h-full  w-full flex-wrap">
          <NewBoards />

          {data.map((board) => (
            <BoardFinal
              key={board.id}
              title={board.title}
              color={board.color}
              id={board.id}
            />
          ))}
        </div>
      </main>
    </>
  );
}
