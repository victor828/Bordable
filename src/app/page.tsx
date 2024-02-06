import { BoardFinal } from "./lib/component/boards/boardFinal";
import Board from "./lib/component/boards/boart";
import { Header } from "./lib/component/header";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="container mx-auto grid py-16 w-[80%] max-h-screen gap-8 ">
        <div className="w-40 grid gap-4">
          <h1>My Boards</h1>
          <div className="grid gap-2 ">
            <p>Sort by</p>
            <select
              name="sort"
              id="sort"
              className="text-black rounded-md p-2 h-10"
            >
              <option value="date" selected>
                Date
              </option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* space for Boards */}
        <div className="flex  justify-between gap-8 h-full  w-full flex-wrap">
          <Board />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
          <BoardFinal />
        </div>
      </section>
    </main>
  );
}
