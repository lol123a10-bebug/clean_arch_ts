import { Database } from "../../interfaces";
import { MongoDBContactDataSource } from "./mongodb-contact-data-source";

describe("MongoDB DataSource", () => {
  let mockDatabase: Database;

  beforeAll(async () => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);
    jest.spyOn(mockDatabase, "find").mockImplementation(() =>
      Promise.resolve([
        {
          _id: "1",
          surname: "Smith",
          firstName: "John",
          email: "john@gmail.com",
        },
      ])
    );

    const result = await ds.getAll();
    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toStrictEqual([
      {
        id: "1",
        surname: "Smith",
        firstName: "John",
        email: "john@gmail.com",
      },
    ]);
  });

  test("create", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);
    jest.spyOn(mockDatabase, "insertOne").mockImplementation(() =>
      Promise.resolve({
        insertedId: "123",
      })
    );

    const contact = {
      surname: "Smith",
      email: "john@gmai.com",
      firstName: "John",
    };

    const result = await ds.create(contact);

    expect(mockDatabase.insertOne).toHaveBeenCalledWith(contact);
    expect(result).toStrictEqual(true);
  });
});
