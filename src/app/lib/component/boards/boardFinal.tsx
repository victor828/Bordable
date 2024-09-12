import axios from "axios";
import { inter } from "../../ui/fonts";
import Link from "next/link";
import { token, url } from "@/utils/utils";

interface IBoard {
  title: string;
  color: string;
  id: number;
}

export function BoardFinal({ title, color, id }: IBoard) {
  async function handleDelete(e: any) {
    e.preventDefault();
    await axios.delete(url + `/delete-board/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <>
      <Link
        href={{ pathname: "/board", query: { id } }}
        style={{ backgroundColor: `${color}` }}
        className={`${inter} w-64 h-36 grid justify-center items-center  font-bold p-4 rounded-lg`}
        // onClick={handleClick}
      >
        <button
          className='relative top-[-30px] right-[-112px] hover:scale-150'
          onClick={handleDelete}>
          ❌
        </button>
        <h1>{title}</h1>
      </Link>
    </>
  );
}
