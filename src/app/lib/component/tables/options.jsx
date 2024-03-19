"use client";
import { getParams, handleAxios, token, url } from "@/utils/utils";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export function OptionsTable(id, handleUpdate) {
  const searchParams = useSearchParams();
  const param = getParams(searchParams);
  // console.log(param);
  // console.log(id);

  const pathCard = `/board/${param.id}/table/:${id}/card/:id_card`;
  const pathTable = `/board/${param.id}/table/${id.id}`;
  // board / 3 / table / 3;
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

  async function handleDeleteCard() {
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
    // container
    // className='w-full font-semibold text-start'

    <article className='w-24 rounded-md bg-[#f5f5f5] border border-dark hover box-border p-1 '>
      <section>
        <button
          className='w-full font-semibold p-1 rounded text-start hover:bg-[#D9D9D9]'
          type='submit'
          onClick={handleUpdate}>
          Edit
        </button>
        <div></div>
        <button
          type='button'
          className='w-full font-semibold text-start p-1 rounded hover:bg-[#D9D9D9]'
          onClick={handleDelete}>
          Delete
        </button>
      </section>
    </article>
  );
}
