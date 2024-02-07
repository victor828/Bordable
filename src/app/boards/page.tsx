import Table from "../lib/component/tables/table";
import { Header } from "../lib/component/header";
import { inter } from "../lib/ui/fonts";
import NewTable from "../lib/component/tables/newTable";

export default function boards() {
  return (
    <>
      <Header />
      <main className=" bg-[#FECACA] h-screen ">
        <div className="max-w-[90%] m-auto py-4 grid gap-8 ">
          <div className="flex gap-2 ">
            <h1 className={`${inter.className} font-bold text-2xl`}>
              My board title
            </h1>
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
          </div>

          {/* cuerpo*/}
          <div className="flex justify-between">
            <Table />
            <NewTable />
          </div>
        </div>
      </main>
    </>
  );
}
