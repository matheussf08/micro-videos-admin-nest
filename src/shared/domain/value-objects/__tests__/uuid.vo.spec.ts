import { InvalidUuidError, Uuid } from "../uuid.vo";

describe("Uuid Unit Tests", () => {
  //   test("should throw error when uuid is invalid", () => {
  //     expect(() => {
  //       new Uuid("invalid-uuid");
  //     }).toThrowError(new InvalidUuidError());
  //   });

  test("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
  });
});
