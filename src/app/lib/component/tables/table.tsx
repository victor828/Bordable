import React from "react";

export default function Table() {
  return (
    <section className=" rounded-md w-72 h-full p-2 grid gap-2 bg-[#F5F5F5]">
      {/* title */}
      <div className="flex justify-between items-center text-lg font-bold py-1.5">
        <h1 className="text-xl font-bold text-center">My Table</h1>
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#525252"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#525252"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {/* table content */}
      <div className="flex justify-between items-center text-l  py-1.5 shadow-md rounded-md p-2">
        <p> ejemplo</p>
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#525252"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#525252"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {/* add card */}
      <button className="text-left">+ Add a card</button>
      <form action="" method="post" className={`gap-2 ${hidden}`}>
        {/*o grid*/}
        <label htmlFor="title">Card Title</label>
        <input type="text" id="title" name="title" placeholder="Title" />
        <div className="flex gap-2">
          <button className=" rounded-md h-9 bg-violet-700 text-white p-2">
            Add card
          </button>
          <button className=" rounded-md h-9 bg-violet-700 text-white p-2">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
