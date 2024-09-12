"use client";
import { UseVerifyUser, token, url } from "@/utils/utils";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../lib/component/header";
import Table from "../lib/component/tables/table";
import { inter } from "../lib/ui/fonts";
import axios from "axios";
import NewTable from "../lib/component/tables/newTable";
import Card from "../lib/component/tables/card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Board() {
  const router = useRouter();

  const [searchParams, setSearchParams] = useSearchParams();
  const [tables, setTables] = useState([]);
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  const paramObj = {
    [searchParams[0]]: searchParams[1],
  };
  // ! useEffect
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url + `/allboard/${paramObj.id}`, {
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

    fetchData();
  }, [tables, router, paramObj.id]);

  return (
    <main className=' bg-[#FECACA] h-screen '>
      <Header />
      <div className='max-w-[90%] m-auto py-4 grid gap-8 '>
        <div className='flex gap-2 '>
          <h1 className={`${inter.className} font-bold text-2xl`}>{name}</h1>
        </div>

        {/* cuerpo*/}
        <div className='flex gap-4 '>
          <DndProvider backend={HTML5Backend}>
            {/* <Options /> */}
            {/* //! function to render tables and cards, DONT TOCH! */}
            {tables &&
              tables.map((table) => {
                // console.log(table.cardscount);

                return (
                  <Table
                    key={table.id}
                    id={table.id}
                    title={table.title}
                    cards={table.cardscount}>
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
          </DndProvider>
          <NewTable />
        </div>
        {/* <div className='flex gap-4'>{cards && <Card cards={cards} />}</div> */}
      </div>
    </main>
  );
}
