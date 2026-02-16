import Router from "./router.ts";
import type { IncomingMessage, ServerResponse } from "node:http";

const router = new Router();

router.get("/", (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

router.get("/users", (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ users: ["Alice", "Bob", "Charlie"] }) + "\n");
});

router.get("/users/:id", (req: IncomingMessage, res: ServerResponse, params) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ userId: params.id, name: `User ${params.id}` }) + "\n");
});

router.post("/users", (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User created", status: "success" }) + "\n");
});

router.get(
  "/posts/:postId/comments/:commentId",
  (req: IncomingMessage, res: ServerResponse, params) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ postId: params.postId, commentId: params.commentId, text: "Great post!" }) +
        "\n",
    );
  },
);

router.listen(3000);
