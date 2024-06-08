"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { token, url } from "@/utils/utils";
import { Header } from "../../lib/component/header";
import Table from "../../lib/component/tables/table";
import { inter } from "../../lib/ui/fonts";
import axios from "axios";
import NewTable from "../../lib/component/tables/newTable";
import Card from "../../lib/component/tables/card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ICard {
  id: string;
  title: string;
  tableid: string;
  boardid: string;
}

interface ITable {
  id: string;
  title: string;
  boardid: string;
}

const Board = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const [tables, setTables] = useState<ITable[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const [name, setName] = useState<string>("");
  // const paramObj: {
  //   [x: number]: any;
  //   id: number;
  // } = {
  //   [searchParams[0]]: searchParams[1],
  //   id: 0,
  // };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/allboard/${params.id}}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const responseCards = await axios.get(`${url}/board/table/card/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const myBoard = await axios.get(`${url}/get-board/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setName(myBoard.data.title);
        setCards(responseCards.data);
        setTables(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tables, router, params.id]);

  return (
    <main className='bg-[#FECACA] h-screen'>
      <Header />
      <div className='max-w-[90%] m-auto py-4 grid gap-8'>
        <div className='flex gap-2'>
          <h1 className={`${inter.className} font-bold text-2xl`}>{name}</h1>
        </div>
        <div className='flex gap-4'>
          <DndProvider backend={HTML5Backend}>
            {tables &&
              tables.map((table) => (
                <Table key={table.id} id={table.id} title={table.title}>
                  {cards &&
                    cards.map(
                      (card) =>
                        card.tableid === table.id && (
                          <Card
                            key={card.id}
                            title={card.title}
                            data={card}
                            board={table.boardid}
                          />
                        )
                    )}
                </Table>
              ))}
          </DndProvider>
          <NewTable />
        </div>
      </div>
    </main>
  );
};

export default Board;
