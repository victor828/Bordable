import { BoardFinal } from "./lib/component/boards/boardFinal";
import Board from "./lib/component/boards/boart";
import { Header } from "./lib/component/header";
import { inter } from "./lib/ui/fonts";

export default function Home() {
  return (
    <>
      <Header />
      <main className="content grid gap-8">
        <div className="w-40 grid gap-2">
          <h1 className={`${inter.className} text-2xl font-bold`}>My Boards</h1>
          <div>
            <p>Sort by</p>
            <select name="sort" id="sort" className="w-full rounded-md">
              <option value="date" selected>
                Date
              </option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* space for Boards */}
        <div className="flex gap-8 h-full  w-full flex-wrap">
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
      </main>
    </>
  );
}
