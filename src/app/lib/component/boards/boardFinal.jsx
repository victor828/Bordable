import { useRouter } from "next/router";
import { inter } from "../../ui/fonts";
import Link from "next/link";

export function BoardFinal({ title, color, id }) {
  // const router = useRouter();
  // const handleClick = () => {
  //   router.push({
  //     pathname: "/board",
  //     query: { id },
  //   });
  // };

  return (
    <Link
      href={{ pathname: "/board", query: { id } }}
      style={{ backgroundColor: `${color}` }}
      className={`${inter} w-64 h-36 grid justify-center items-center  font-bold p-4 rounded-lg`}
      // onClick={handleClick}
    >
      <h1>{title}</h1>
    </Link>
  );
}
