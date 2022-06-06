import { ServerResponse } from "node:http";

export class ResourceError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {}

  handleResourceError(response: ServerResponse) {
    const DEFAULT_HEADER = { "Content-Type": "application/json" };

    return () => {
      console.error("Resource is not exists***", this.message);
      response.writeHead(this.statusCode, DEFAULT_HEADER);
      response.write(JSON.stringify({ error: this.message }));

      return response.end();
    };
  }
}
