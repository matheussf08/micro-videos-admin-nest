import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  let validateSpy: any;

  describe("constructor", () => {
    beforeEach(() => {
      validateSpy = jest.spyOn(Category, "validate");
    });

    test("should be create a category with default values", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should be create a category with all values", () => {
      let category = new Category({
        name: "Movie",
        description: "Movie Description",
        is_active: false,
        created_at: new Date(),
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie Description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("create command", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie Description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie Description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        name: "Movie",
        category_id: category_id as any,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
    });
  });

  test("should change name", () => {
    const category = Category.create({
      name: "Movie",
    });

    category.changeName("New name");
    expect(category.name).toBe("New name");
  });

  test("should change description", () => {
    const category = Category.create({
      name: "Movie",
    });

    category.changeDescription("Description");
    expect(category.description).toBe("Description");
  });

  test("should active a category", () => {
    const category = Category.create({
      name: "Movie",
      is_active: false,
    });

    category.activate();
    expect(category.is_active).toBe(true);
  });

  test("should disable a category", () => {
    const category = Category.create({
      name: "Movie",
      is_active: true,
    });

    category.deactivate();
    expect(category.is_active).toBe(false);
  });
});
