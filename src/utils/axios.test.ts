import { describe, it, expect } from "vitest";

import axiosHttp from "./axios";

describe("axiosHttp Utility", () => {
  it("should be configured with correct base URL and timeout", () => {
    const { baseURL, timeout, headers } = axiosHttp.defaults;

    expect(baseURL).toBe(import.meta.env.VITE_API_ENDPOINT);
    expect(timeout).toBe(10000);
    expect(headers["Content-Type"]).toBe("application/json");
  });
});
