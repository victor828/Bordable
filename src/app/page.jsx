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
  UseVerifyUser();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = sessionStorage.getItem("token");
        const token = sessionStorage.getItem("token");

        const response = await axios.get(url + serverUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ajusta según tus necesidades
          },
        });

        response.data.map((board) => {
          console.log(board);
          console.log(board.id);
          console.log(board.title);
          console.log(board.color);
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

    fetchData();
  }, []);

  // function handleRedirect() {
  //   redirect("/board");
  // }
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
              <option value="date" selected>
                Date
              </option>
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
              // handleRedirect={handleRedirect}
              s
            />
          ))}
        </div>
      </main>
    </>
  );
}
