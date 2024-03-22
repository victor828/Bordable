import { InitialtableData, token, url } from "@/utils/utils";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function NewTable() {
  const [formData, setFormData] = useState(InitialtableData);

  const searchParams = useSearchParams();
  const paramObj = {
    [searchParams.toString().split("=")[0]]: searchParams
      .toString()
      .split("=")[1],
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  // board/:id_board/table/:id_table/card/:id_card

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        url + `/board/${paramObj.id}/new-table`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();

      console.log(result);
    } catch (error) {
      console.error("Error creating new table:", error);
    }
  };

  return (
    <form
      id={"nexForm"}
      onSubmit={handleCreate}
      className="w-72 bg-[#F5F5F5]  rounded-md grid gap-2 p-2 h-32"
    >
      <div className="grid gap-2 w-full">
        <label htmlFor="title">List Title</label>
        <input onChange={handleChange} type="text" id="title" name="title" />
      </div>
      <button
        // href={`/board`}
        type="submit"
        className="w-[50%] h-9 bg-violet-700 justify-center p-2 text-white rounded-md"
      >
        Create new list
      </button>
    </form>
  );
}
