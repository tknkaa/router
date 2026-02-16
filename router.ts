import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { parseRoutePath, extractParams } from "./parser.ts";

type Params = Record<string, string>;
type Handler = (req: IncomingMessage, res: ServerResponse, params: Params) => void;
type Method = "GET" | "POST";
type Route = {
  path: string;
  pattern: RegExp;
  paramNames: string[];
  method: Method;
  handler: Handler;
};

class Router {
  routes: Route[];
  constructor() {
    this.routes = [];
  }

  get(path: string, handler: Handler) {
    const { pattern, paramNames } = parseRoutePath(path);
    const newRoute: Route = {
      path,
      pattern,
      paramNames,
      method: "GET",
      handler,
    };
    this.routes.push(newRoute);
  }

  post(path: string, handler: Handler) {
    const { pattern, paramNames } = parseRoutePath(path);
    const newRoute: Route = {
      path,
      pattern,
      paramNames,
      method: "POST",
      handler,
    };
    this.routes.push(newRoute);
  }

  handle(req: IncomingMessage, res: ServerResponse) {
    const path = req.url?.split("?")[0] || "/";
    const method = req.method as Method;

    for (const route of this.routes) {
      if (route.method === method) {
        const params = extractParams(path, route);
        if (params !== null) {
          return route.handler(req, res, params);
        }
      }
    }
  }

  listen(port: number) {
    const server = http.createServer((req, res) => {
      this.handle(req, res);
    });
    server.listen(port, () => {
      console.log(`Router listening on port ${port}`);
    });
  }
}

export default Router;
