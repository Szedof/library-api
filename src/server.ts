import App from "app";
import BooksRouter from "@routes/book.router";
import UsersRouter from "@routes/user.router";

const routes = [new BooksRouter(), new UsersRouter()];
const server = new App(routes);

server.listen();
