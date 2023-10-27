import request from "supertest";
import {
  CreateContactUseCase,
  GetAllContactsUseCase,
} from "../../domain/_interfaces/use-cases";
import { Contact } from "../../domain/entities/contact";
import server from "../../server";
import { ContactRouter } from "./contact-router";

class MockGetAllContactsUseCase implements GetAllContactsUseCase {
  execute(): Promise<Contact[]> {
    throw new Error("Method not implemented.");
  }
}

class MockCreateContactUseCase implements CreateContactUseCase {
  execute(contact: Contact): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("Contact Router", () => {
  let mockCreateContactUseCase: CreateContactUseCase;
  let mockGetAllContactsUseCase: GetAllContactsUseCase;

  beforeAll(() => {
    mockCreateContactUseCase = new MockCreateContactUseCase();
    mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
    server.use(
      "/contact",
      ContactRouter(mockGetAllContactsUseCase, mockCreateContactUseCase)
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /contact", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = [
        {
          id: "1",
          surname: "Smith",
          firstName: "John",
          email: "john@gmail.com",
        },
      ];

      jest
        .spyOn(mockGetAllContactsUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get("/contact");

      expect(response.status).toBe(200);
      expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test("GET /contact return 500 on use case error", async () => {
      jest
        .spyOn(mockGetAllContactsUseCase, "execute")
        .mockImplementation(() => Promise.reject(new Error()));

      const response = await request(server).get("/contact");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "error fetching data" });
    });

    describe("POST /contact", () => {
      const InputData = {
        id: "1",
        surname: "Smith",
        firstName: "John",
        email: "john@gmail.com",
      };

      test("POST /contact", async () => {
        jest
          .spyOn(mockCreateContactUseCase, "execute")
          .mockImplementation(() => Promise.resolve(true));

        const response = await request(server).post("/contact").send(InputData);
        expect(response.status).toBe(201);
      });

      test("POST /contact returns 500 on use case error", async () => {
        jest
          .spyOn(mockCreateContactUseCase, "execute")
          .mockImplementation(() => Promise.reject(new Error()));

        const response = await request(server).post("/contact").send(InputData);
        expect(response.status).toBe(500);
      });
    });
  });
});
