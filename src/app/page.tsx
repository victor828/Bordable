"use client";
import axios from "axios";
import { BoardFinal } from "./lib/component/boards/boardFinal";
import { Header } from "./lib/component/header";
import { inter } from "./lib/ui/fonts";
import { token, url } from "@/utils/utils";
import React, { useState, useEffect } from "react";
import NewBoards from "./lib/component/boards/boart";
import { redirect } from "next/navigation";

export default function Home() {
  if (!token) {
    redirect("/login");
  }

  const [sort, setSort] = useState("createdate");
  const [data, setData] = useState([]);

  const board = `/board/${sort}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url + board, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response) {
          throw new Error(`Error de red: ${response}`);
        }
        setData(response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
    fetchData();
  }, [sort, board, data]);

  return (
    <>
      <Header />
      <main className="content grid gap-8">
        <div className="w-40 grid gap-2">
          <h1 className={`${inter.className} text-2xl font-bold`}>My Boards</h1>
          <div>
            <p>Sort by</p>
            <select
              defaultValue={"createdate"}
              title="sort"
              name="sort"
              id="sort"
              className="w-full rounded-md"
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="createdate">Date</option>
              <option value="title">Name</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8 h-full  w-full flex-wrap">
          <NewBoards />

          {data.map((board: { id: number; title: string; color: string }) => (
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
