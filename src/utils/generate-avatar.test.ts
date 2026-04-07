import { genAvatar } from "./generate-avatar";

describe("genAvatar utiltity", () => {
  it("should generate correct URL with a positive number ", () => {
    const length = 5;
    const result = genAvatar(length);
    expect(result).toBe("https://i.pravatar.cc/150?u=5");
  });
  it("should generate correct URL with zero", () => {
    const result = genAvatar(0);
    expect(result).toBe("https://i.pravatar.cc/150?u=0");
  });
});
