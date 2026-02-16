import { describe, it, expect } from "vitest";
import { parseRoutePath, extractParams } from "./parser";

describe("parseRoutePath", () => {
  it("should parse simple paths without parameters", () => {
    const result = parseRoutePath("/users");
    expect(result.paramNames).toEqual([]);
    expect(result.pattern.test("/users")).toBe(true);
    expect(result.pattern.test("/user")).toBe(false);
  });

  it("should parse paths with single parameter", () => {
    const result = parseRoutePath("/users/:id");
    expect(result.paramNames).toEqual(["id"]);
    expect(result.pattern.test("/users/123")).toBe(true);
    expect(result.pattern.test("/users/abc")).toBe(true);
    expect(result.pattern.test("/users/")).toBe(false);
    expect(result.pattern.test("/users")).toBe(false);
  });

  it("should parse paths with multiple parameters", () => {
    const result = parseRoutePath("/posts/:postId/comments/:commentId");
    expect(result.paramNames).toEqual(["postId", "commentId"]);
    expect(result.pattern.test("/posts/123/comments/456")).toBe(true);
    expect(result.pattern.test("/posts/abc/comments/xyz")).toBe(true);
    expect(result.pattern.test("/posts/123/comments")).toBe(false);
    expect(result.pattern.test("/posts/123")).toBe(false);
  });

  it("should not match paths with slashes in parameter values", () => {
    const result = parseRoutePath("/users/:id");
    expect(result.pattern.test("/users/123/extra")).toBe(false);
  });

  it("should return correct capture groups", () => {
    const result = parseRoutePath("/users/:id");
    const match = "/users/123".match(result.pattern);
    expect(match).not.toBeNull();
    expect(match?.[1]).toBe("123");
  });

  it("should extract multiple capture groups in order", () => {
    const result = parseRoutePath("/posts/:postId/comments/:commentId");
    const match = "/posts/42/comments/99".match(result.pattern);
    expect(match).not.toBeNull();
    expect(match?.[1]).toBe("42");
    expect(match?.[2]).toBe("99");
  });

  it("should preserve parameter names order", () => {
    const result = parseRoutePath("/api/:version/users/:id/posts/:postId");
    expect(result.paramNames).toEqual(["version", "id", "postId"]);
  });

  it("should handle root path", () => {
    const result = parseRoutePath("/");
    expect(result.paramNames).toEqual([]);
    expect(result.pattern.test("/")).toBe(true);
    expect(result.pattern.test("/anything")).toBe(false);
  });

  it("should handle parameter names with underscores and numbers", () => {
    const result = parseRoutePath("/items/:item_id_1");
    expect(result.paramNames).toEqual(["item_id_1"]);
    expect(result.pattern.test("/items/value123")).toBe(true);
  });
});

describe("extractParams", () => {
  it("should extract single parameter", () => {
    const parsed = parseRoutePath("/users/:id");
    const params = extractParams("/users/123", parsed);
    expect(params).toEqual({ id: "123" });
  });

  it("should extract multiple parameters", () => {
    const parsed = parseRoutePath("/posts/:postId/comments/:commentId");
    const params = extractParams("/posts/42/comments/99", parsed);
    expect(params).toEqual({ postId: "42", commentId: "99" });
  });

  it("should return null for non-matching paths", () => {
    const parsed = parseRoutePath("/users/:id");
    const params = extractParams("/posts/123", parsed);
    expect(params).toBeNull();
  });

  it("should extract alphanumeric parameter values", () => {
    const parsed = parseRoutePath("/items/:itemId");
    const params = extractParams("/items/item-abc-123", parsed);
    expect(params).toEqual({ itemId: "item-abc-123" });
  });

  it("should extract parameters from paths with no parameters", () => {
    const parsed = parseRoutePath("/users");
    const params = extractParams("/users", parsed);
    expect(params).toEqual({});
  });
});
