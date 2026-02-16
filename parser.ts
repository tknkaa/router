export function parseRoutePath(path: string): { pattern: RegExp; paramNames: string[] } {
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

export function extractParams(
  path: string,
  parsed: { pattern: RegExp; paramNames: string[] },
): Record<string, string> | null {
  const match = path.match(parsed.pattern);
  if (!match) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < parsed.paramNames.length; i++) {
    params[parsed.paramNames[i]] = match[i + 1];
  }
  return params;
}
