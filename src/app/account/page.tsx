import { Header } from "../lib/component/header";
import { inter } from "../lib/ui/fonts";

export default function Account() {
  /* // todo:
    hacer que cada campo aparesca como placeholder el dato actual del usuario
    darle la funcion al boton update para que haga el post y actualice los datos
    darle la funcion a delee para que haga eliminacion de la cuenta
*/

  return (
    <>
      <body className="container">
        <Header />
        <div className="content h-full">
          <h1 className={`${inter.className} text-2xl font-bold`}>
            My Account
          </h1>
          <div className="w-80 m-auto grid gap-4 ">
            {/* form */}
            <form action="" method="post" className="grid gap-4 ">
              <div className="form_input">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className="form_input">
                <label htmlFor="name">Name</label>
                <input type="name" id="username" name="username" required />
              </div>
              <div className="form_input">
                <label htmlFor="email">Email</label>
                <input type="email" id="username" name="username" required />
              </div>
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <input type="password" id="username" name="username" required />
              </div>
              <button className="btnL">Update</button>
            </form>
            {/* delete */}
            <button className="btnL">Delete my account</button>
          </div>
        </div>
      </body>
    </>
  );
}
