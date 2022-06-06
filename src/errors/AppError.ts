import { ServerResponse } from "node:http";

export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  handleErrorApp(response: ServerResponse) {
    const DEFAULT_HEADER = { "Content-Type": "application/json" };

    return () => {
      console.error("Internal Error***", this.message);
      response.writeHead(this.statusCode, DEFAULT_HEADER);
      response.write(JSON.stringify({ error: "Internal Server Error!" }));

      return response.end();
    };
  }
}
