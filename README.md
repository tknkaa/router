# Router

A lightweight HTTP router for Node.js with support for parameterized routes.

## Features

- Simple GET and POST method routing
- Dynamic route parameters (`:paramName`)
- Pattern matching with regex
- TypeScript support
- No external dependencies (uses only Node.js built-in `http` module)

## Installation

```bash
npm install
```

## Usage

### Starting the Server

```bash
npm run dev
```

The server will start on port 3000 and output:

```
Router listening on port 3000
```

### Defining Routes

```typescript
import Router from "./router.ts";

const router = new Router();

// GET request with no parameters
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

// GET request with path parameters
router.get("/users/:id", (req, res, params) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ userId: params.id }));
});

// POST request
router.post("/users", (req, res) => {
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User created" }));
});

// Multiple path parameters
router.get("/posts/:postId/comments/:commentId", (req, res, params) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      postId: params.postId,
      commentId: params.commentId,
    }),
  );
});

router.listen(3000);
```

### Example cURL Commands

#### Simple GET request

```bash
curl http://localhost:3000/
```

#### GET all users

```bash
curl http://localhost:3000/users
```

#### GET a specific user

```bash
curl http://localhost:3000/users/123
curl http://localhost:3000/users/john
```

#### POST to create a user

```bash
curl -X POST http://localhost:3000/users
```

#### GET a specific post comment

```bash
curl http://localhost:3000/posts/42/comments/99
```

#### Multiple parameters

```bash
curl http://localhost:3000/posts/1/comments/5
```

## Testing

Run the test suite:

```bash
npm test
```

This runs vitest which includes tests for:

- Route path parsing with single and multiple parameters
- Parameter extraction and mapping
- Edge cases (trailing slashes, special characters, etc.)

## API Reference

### Router Methods

#### `router.get(path, handler)`

Register a GET route.

**Parameters:**

- `path` (string): Route path with optional parameters (e.g., `/users/:id`)
- `handler` (function): Handler function that receives `(req, res, params)`

#### `router.post(path, handler)`

Register a POST route.

**Parameters:**

- `path` (string): Route path with optional parameters
- `handler` (function): Handler function that receives `(req, res, params)`

#### `router.listen(port)`

Start the server on the specified port.

**Parameters:**

- `port` (number): Port number to listen on

### Handler Function

The handler function receives three parameters:

- `req` (IncomingMessage): Node.js request object
- `res` (ServerResponse): Node.js response object
- `params` (Record<string, string>): Object containing extracted path parameters

Example:

```typescript
router.get("/users/:userId/posts/:postId", (req, res, params) => {
  console.log(params.userId); // User ID from URL
  console.log(params.postId); // Post ID from URL
});
```

## Development

Format code:

```bash
npm run fmt
```
