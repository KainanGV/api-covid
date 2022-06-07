// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, jest } from "@jest/globals";

import Routes from "../router/routes";

describe("Routes test suite", () => {
  describe("handler", () => {
    const defaultParams = {
      request: {
        headers: {
          "Content-Type": "application/json",
        },
        method: "",
        body: {},
        url: "",
      },
      response: {
        setHeader: jest.fn(),
        writeHead: jest.fn(),
        write: jest.fn(),
        end: jest.fn(),
        statusCode: "",
      },
      values: () => Object.values(defaultParams),
    };
    test("it should set any request with CORS enabled", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      // params.request.method = 'inexistent'
      await routes.handler(...params.values());
      expect(params.response.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        "*"
      );
    });

    test("given an inexistent route it should choose default route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      params.request.method = "GET";
      params.request.url = "/indicad";
      await routes.handler(...params.values());

      expect(params.response.statusCode).toStrictEqual(400);
      expect(params.response.end).toHaveBeenCalled();
    });

    test("given method GET it should choose get route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      params.request.method = "GET";
      params.request.url = "/indicadores";

      await routes.handler(...params.values());
      expect(params.response.statusCode).toStrictEqual(200);
    });
  });
});
