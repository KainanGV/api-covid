/* eslint-disable consistent-return */
import http, { IncomingMessage, ServerResponse } from "http";

import { AppError } from "./errors/AppError";
import { ResourceError } from "./errors/ResourceError";
import Factory from "./factories/factory";

const covidService = Factory();

const PORT = process.env.PORT || 3000;

const DEFAULT_HEADER = { "Content-Type": "application/json" };

const routes = {
  default: (request: IncomingMessage, response: ServerResponse) => {
    const resourceError = new ResourceError("Resource is not exists", 400);
    return resourceError.handleResourceError(response)();
  },

  "/indicadores:get": async (
    request: IncomingMessage,
    response: ServerResponse
  ): Promise<ServerResponse> => {
    try {
      const countryStatesCases = await covidService.handle();
      response.write(JSON.stringify(countryStatesCases));
      response.end();
    } catch (error) {
      // eslint-disable-next-line no-use-before-define
      const appError = new AppError("Internal server error", 500);
      return appError.handleErrorApp(response)();
    }
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
