/* eslint-disable consistent-return */
import http from "http";

import Routes from "./router/routes";

const PORT = process.env.PORT || 3000;

const routes = new Routes();

http
  .createServer(routes.handler.bind(routes))
  .listen(PORT, () => console.log(`Server is running at ${PORT}`));
