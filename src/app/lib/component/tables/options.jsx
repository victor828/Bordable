"use client";
import { getParams, handleAxios, token, url } from "@/utils/utils";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export function OptionsTable(id, handleUpdate, hidden) {
  const searchParams = useSearchParams();
  const param = getParams(searchParams);
  const pathTable = `/board/${param.id}/table/${id.id}`;

  async function handleDelete() {
    try {
      const result = await axios.delete(url + pathTable, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    try {
      const result = await axios.put(url + pathTable, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article
      className={`w-24 rounded-md bg-[#f5f5f5] border border-dark hover box-border p-1 hidden`}
    >
      <section>
        <button
          className="w-full font-semibold p-1 rounded text-start hover:bg-[#D9D9D9]"
          type="submit"
          onClick={handleUpdate}
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
      </section>
    </article>
  );
}
