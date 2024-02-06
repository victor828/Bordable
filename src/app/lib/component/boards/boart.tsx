export default function newBoards() {
  /* // TODO: 
    crear la lista de paleta de color para los colorres especificados
    definir el olor dependiendo del color seleccionado en el imput
  */
  return (
    <form className={`w-64 h-36 p-4 grid gap-4 bg-gray-300 rounded-lg`}>
      <div className="grid gap-2">
        <label htmlFor="title">Title</label>
        <input
          className="rounded-sm p-1"
          type="text"
          id="title"
          name="title"
          placeholder="Enter title... "
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <label htmlFor="color">Color</label>
          {/* <input type="color" name="color" id="color" /> */}
          <button className="rounded-[50%] border w-6 h-6"> </button>
        </div>
        <button className="btnBoard">create</button>
      </div>
    </form>
  );
}
