export default function NewTable() {
  return (
    <section className="w-72 bg-[#F5F5F5] h-full rounded-md grid gap-2 p-2">
      <div className="grid gap-2 w-full">
        <label htmlFor="title">List Title</label>
        <input type="text" id="title" name="title" />
      </div>
      <button className="w-[50%] h-9 bg-violet-700 justify-center p-2 text-white rounded-md">
        Create new list
      </button>
    </section>
  );
}
