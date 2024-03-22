"use client";
import { UseVerifyUser, token, url } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../lib/component/header";
import Table from "../lib/component/tables/table";
import { inter } from "../lib/ui/fonts";
import axios from "axios";
import NewTable from "../lib/component/tables/newTable";
import { Options } from "../lib/component/tables/options";
import Card from "../lib/component/tables/card";

export default function Board() {
  UseVerifyUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tables, setTables] = useState([]);
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  const paramObj = {
    [searchParams[0]]: searchParams[1],
  };
  //! useEffect
  useEffect(() => {
    fetchData();
  }, [paramObj.id, tables]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url + `/board/${paramObj.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseCards = await axios.get(url + `/board/table/card/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const myBoard = await axios.get(url + `/get-board/${paramObj.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setName(myBoard.data.title);
      setCards(responseCards.data);

      setTables(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className=" bg-[#FECACA] h-screen ">
        <Header />
        <div className="max-w-[90%] m-auto py-4 grid gap-8 ">
          <div className="flex gap-2 ">
            <h1 className={`${inter.className} font-bold text-2xl`}>{name}</h1>
            <div className="grid items-center">
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
            </div>
          </div>

          {/* cuerpo*/}
          <div className="flex gap-4 ">
            {/* <Options /> */}
            {/* //! funcion to render tables and cards, DONT TOCH! */}
            {tables &&
              tables.map((table) => {
                // console.log(table.cardscount);
                const height = table.cardscount < 1 ? "100px" : "auto";

                return (
                  <Table
                    key={table.id}
                    id={table.id}
                    height={height}
                    title={table.title}
                    cards={table.cardscount}
                  >
                    {cards &&
                      cards.map((card) => {
                        if (card.tableid === table.id) {
                          return (
                            <Card
                              key={card.id}
                              title={card.title}
                              data={card}
                              board={table.boardid}
                            />
                          );
                        }
                        return null;
                      })}
                  </Table>
                );
              })}
            <NewTable />
          </div>
          {/* <div className='flex gap-4'>{cards && <Card cards={cards} />}</div> */}
        </div>
      </main>
    </>
  );
}
