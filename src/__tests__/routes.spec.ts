// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect, jest } from "@jest/globals";

import Routes from "../router/router";

describe("Routes test suite", () => {
  describe("handler", () => {
    const defaultParams = {
      request: {
        headers: {
          "Content-Type": "application/json",
        },
        method: "",
        body: {},
      },
      response: {
        setHeader: jest.fn(),
        writeHead: jest.fn(),
        end: jest.fn(),
      },
      values: () => Object.values(defaultParams),
    };

    test("given an inexistent route it should choose default route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      params.request.method = "inexistent";
      await routes.handler();

      expect(params.response.end).toHaveBeenCalledWith("hello world");
    });
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
  });
});
