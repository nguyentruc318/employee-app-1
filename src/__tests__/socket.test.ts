import { io } from "socket.io-client";
import "../configs/socket";
vi.mock("socket.io-client");

describe("Socket Utility", () => {
  it("should return a socket instance", () => {
    expect(io).toHaveBeenCalledTimes(1);
    expect(io).toHaveBeenCalledWith(import.meta.env.VITE_API_ENDPOINT);
  });
});
