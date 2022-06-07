import finalHandler from "finalhandler";
import { IncomingMessage, ServerResponse } from "http";
import morgan from "morgan";

import { AppError } from "../errors/AppError";
import { ResourceError } from "../errors/ResourceError";
import Factory from "../factories/factory";

const DEFAULT_HEADER = { "Content-Type": "application/json" };
const covidService = Factory();
const logger = morgan("combined");

export default class Routes {
  async defaultRoute(request: IncomingMessage, response: ServerResponse) {
    const resourceError = new ResourceError("Resource is not exists", 400);
    return resourceError.handleResourceError(response)();
  }

  // eslint-disable-next-line consistent-return
  async "/indicadores:get"(
    request: IncomingMessage,
    response: ServerResponse
  ): Promise<ServerResponse> {
    try {
      const countryStatesCases = await covidService.handle();

      response.writeHead(200, DEFAULT_HEADER);
      response.write(JSON.stringify(countryStatesCases));

      response.end();
    } catch (error) {
      // eslint-disable-next-line no-use-before-define
      const appError = new AppError("Internal server error", 500);
      return appError.handleErrorApp(response)();
    }
  }

  handler(...args): Promise<ServerResponse> {
    const [request, response] = args;

    response.setHeader("Access-Control-Allow-Origin", "*");
    const done = finalHandler(request, response);
    logger(request, response, function (err): void {
      if (err) done(err);
    });

    const { url, method } = request;
    const [first, route] = url.split("/");

    const key = `/${route}:${method.toLowerCase()}`;

    const chosen = this[key] || this.defaultRoute;

    return chosen.apply(this, [request, response]);
  }
}
