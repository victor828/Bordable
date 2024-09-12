import { getParams, token, url } from "@/utils/utils";
import { useDrag } from "react-dnd";
import axios from "axios";
import { createRef, useEffect, useState } from "react";

export default function Card({ title, data, board }: any) {
  const [show, setShow] = useState("hidden");
  const [name, setName] = useState("");
  const [hiddenP, setHiddenP] = useState("");
  const [hiddenF, setHiddenF] = useState("hidden");

  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const pathCard = `/board/${board}/table/${data.tableid}/card/${data.id}`;
  const handleShow = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  async function handleDelete() {
    try {
      const result = await axios.delete(url + pathCard, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  const sendata = {
    title: name,
  };

  async function handleUpdate() {
    try {
      const result = await axios.patch(url + pathCard, sendata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      // window.location.reload();
      setShow("hidden");
      hiddenP === "" ? setHiddenP("hidden") : setHiddenP("");
      hiddenF === "hidden" ? setHiddenF("") : setHiddenF("hidden");
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdateTitle() {
    /* //todo: 
    * 1- esconter el `parrafo`
    * 2- mostrar el formulario
    que hacer:
      si precionamos el boton edit tenemos que esconder el `parrafo` y mostrar el `formulario` entonces necesitaremos 2 nuevas variables
      * 1- hideenP: escondera y ostrara el parrafo
      * 2- hiddenF: escondera y mostrara el formulario
      * 3- necesitaremos un boton que realice la peticion y restaure los hidden para que solo se muestre p y no el form
      */
    hiddenP === "" ? setHiddenP("hidden") : setHiddenP("");
    hiddenF === "hidden" ? setHiddenF("") : setHiddenF("hidden");
  }

  return (
    <section className="relative" ref={dragRef}>
      <div
        draggable
        className="flex justify-between items-center text-l  py-1.5 shadow-md rounded-md p-2  hover:bg-slate-400"
      >
        <p className={`${hiddenP}`}>{title}</p>
        <section className={`${hiddenF}`}>
          <form>
            <textarea
              className=" resize-none h-24 text-pretty"
              defaultValue={title}
              name="name"
              id="name"
              minLength={10}
              wrap="soft"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </section>
        {isDragging && "📦"}
        {/* <button type="button"> */}
        <button type="button" onClick={handleShow}>
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
        </button>
      </div>
      <article
        // className={`w-24 rounded-md bg-[#f5f5f5] border border-dark hover box-border p-1 top-[-67px] left-[268px] relative`}
        className={`w-24 rounded-md bg-[#f5f5f5] border border-dark hover box-border p-1 top-[-19px] left-[268px] absolute z-50 ${show}`}
      >
        <section>
          <button
            className="w-full font-semibold p-1 rounded text-start hover:bg-[#D9D9D9]"
            type="submit"
            onClick={handleUpdateTitle}
          >
            Edit
          </button>
          <button
            type="button"
            className="w-full font-semibold text-start p-1 rounded hover:bg-[#D9D9D9]"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className={`w-full font-semibold text-start p-1 rounded hover:bg-[#D9D9D9] ${hiddenF}`}
            onClick={handleUpdate}
          >
            Update
          </button>
        </section>
      </article>
    </section>
  );
}
