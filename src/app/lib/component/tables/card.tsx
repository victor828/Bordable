export default function Card({ title }: any) {
  // async function handleUpdate() {
  //   const pathTable = `/board/${paramObj.id}/table/${id}`;

  //   try {
  //     const result = await axios.patch(
  //       url + pathTable,
  //       { title: dataEx },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(result.data);
  //     setTitle(result.data.data.title);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      <div className='flex justify-between items-center text-l  py-1.5 shadow-md rounded-md p-2'>
        <p>{title}</p>
        <button type='button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'>
            <path
              d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
              stroke='#525252'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z'
              stroke='#525252'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z'
              stroke='#525252'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
      </div>
      <article className='w-24 rounded-md bg-[#f5f5f5] border border-dark hover box-border p-1 '>
        <section>
          <button
            className='w-full font-semibold p-1 rounded text-start hover:bg-[#D9D9D9]'
            type='submit'
            // onClick={handleUpdate}
          >
            Edit
          </button>
          <button
            type='button'
            className='w-full font-semibold text-start p-1 rounded hover:bg-[#D9D9D9]'
            // onClick={handleDelete}
          >
            Delete
          </button>
        </section>
      </article>
    </>
  );
}
