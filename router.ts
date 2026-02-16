import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";

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

  private parseRoutePath(path: string): { pattern: RegExp; paramNames: string[] } {
    // Extract parameter names and convert path to regex pattern
    // Example: "/users/:id" -> pattern: /^\/users\/([^/]+)$/, paramNames: ["id"]
    const paramNames: string[] = [];

    // Replace :paramName with regex capture group ([^/]+) that matches any non-slash chars
    // Example: "/posts/:postId/comments/:commentId" -> "/posts/([^/]+)/comments/([^/]+)"
    let pattern = path.replace(/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "([^/]+)";
    });

    // Return compiled regex and list of param names for later extraction
    // Pattern matches full path, paramNames used to map capture groups to param objects
    return { pattern: new RegExp(`^${pattern}$`), paramNames };
  }

  get(path: string, handler: Handler) {
    const { pattern, paramNames } = this.parseRoutePath(path);
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
    const { pattern, paramNames } = this.parseRoutePath(path);
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
        const match = path.match(route.pattern);
        if (match) {
          const params: Params = {};
          route.paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
          });
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
