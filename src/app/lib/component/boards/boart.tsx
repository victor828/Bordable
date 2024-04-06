import { InitialBoardData, initialFormData, token, url } from "@/utils/utils";
import axios from "axios";
import { useState } from "react";

export default function NewBoards() {
  const [hidden, setHidden] = useState(false);
  const [color, setColor] = useState("#E2E8F0");

  const [formData, setFormData] = useState(InitialBoardData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  const handleCreate = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const result = await axios.post(url + "/new-board", formData, options);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className={`w-64 h-36 p-4 grid gap-4 rounded-lg`}
        style={{ background: `${color}` }}
      >
        <div className="grid gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="rounded-sm p-1"
            required
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            placeholder="Enter title... "
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="color">Color</label>
            {/* <input type="color" name="color" id="color" /> */}
            <button
              type="button"
              onClick={() => {
                setHidden((prevHidden) => !prevHidden);
              }}
              className="rounded-[50%] border border-black  w-6 h-6"
            >
              {" "}
            </button>
          </div>
          <button onClick={handleCreate} type="submit" className="btnBoard">
            create
          </button>
        </div>
      </form>
      {/* cambio de color */}
      <section
        className={`bg-white border border-black border-opacity-20 ${
          hidden ? "" : "hidden"
        } absolute left-[335px] bottom-[441px] 
        rounded-md w-[124px] h-[68px] gap-1 grid grid-cols-4 grid-rows-2 p-2 rounded-2`}
      >
        <button
          type="button"
          value={"#E2E8F0"}
          onClick={() => {
            setFormData((prevData) => ({
              ...prevData,
              color: "#E2E8F0",
            }));
            setColor("#E2E8F0");
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#E2E8F0] border text-[hidden] w-6 h-6"
        ></button>
        <button
          type="button"
          value={"#FECACA"}
          onClick={() => {
            setFormData((prevData) => ({ ...prevData, color: "#FECACA" }));

            setColor("#FECACA");
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#FECACA] border w-6 h-6"
        ></button>
        <button
          type="button"
          value={"#FED7AA"}
          onClick={() => {
            setFormData((prevData) => ({ ...prevData, color: "#FED7AA" }));
            setColor("#FED7AA");
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#FED7AA] border w-6 h-6"
        ></button>
        <button
          type="button"
          value={"#FEF08A"}
          onClick={() => {
            setFormData((prevData) => ({ ...prevData, color: "#FEF08A" }));
            setColor("#FEF08A");
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#FEF08A] border w-6 h-6"
        ></button>
        <button
          type="button"
          value={"#D9F99D"}
          onClick={() => {
            setColor("#D9F99D");
            setFormData((prevData) => ({ ...prevData, color: "#D9F99D" }));
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#D9F99D] border w-6 h-6"
        ></button>
        <button
          type="button"
          value={"#BFDBFE"}
          onClick={() => {
            setColor("#BFDBFE");
            setFormData((prevData) => ({ ...prevData, color: "#BFDBFE" }));
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#BFDBFE] border w-6 h-6"
        ></button>
        <button
          type="button"
          value={"#FBCFE8"}
          onClick={() => {
            setFormData((prevData) => ({ ...prevData, color: "#FBCFE8" }));
            setColor("#FBCFE8");
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#FBCFE8] border w-6 h-6"
        ></button>
        <button
          type="button"
          value={"#DDD6FE"}
          onClick={() => {
            setFormData((prevData) => ({ ...prevData, color: "#DDD6FE" }));
            setColor("#DDD6FE");
            setHidden((prevHidden) => !prevHidden);
          }}
          className="rounded-[50%] bg-[#DDD6FE] border w-6 h-6"
        ></button>
      </section>
    </>
  );
}

// left: 335px;
// position: absolute;
// bottom: 441px;
