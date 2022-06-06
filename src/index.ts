import http, { IncomingMessage, ServerResponse } from "http";

import Factory from "./factories/factory";

const covidService = Factory();

const PORT = process.env.PORT || 3000;
const DEFAULT_HEADER = { "Content-Type": "application/json" };

const routes = {
  default: (request: IncomingMessage, response: ServerResponse) => {
    response.write("Hello");
    response.end();
  },

  "/indicadores:get": async (
    request: IncomingMessage,
    response: ServerResponse
  ) => {
    const countryStatesCases = covidService.handle();
    response.write(JSON.stringify(countryStatesCases));
  },
};

const handler = (request: IncomingMessage, response: ServerResponse) => {
  const { url, method } = request;
  const [first, route] = url.split("/");

  const key = `/${route}:${method.toLowerCase()}`;

  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;

  return chosen(request, response);
};

http
  .createServer(handler)
  .listen(PORT, () => console.log(`Server is running at ${PORT}`));
