import { ContactDataSource } from "../../data/interfaces";
import { ContactRepository } from "../_interfaces/repositories";
import { Contact } from "../entities/contact";
import { ContactRepositoryImpl } from "./contact-repository";

class MockContactDataSource implements ContactDataSource {
  create(contact: Contact): Promise<boolean> {
    throw new Error("not impl");
  }

  getAll(): Promise<Contact[]> {
    throw new Error("not impl");
  }
}

describe("Contact Repository", () => {
  let mockContactDataSource: MockContactDataSource;
  let contactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactDataSource = new MockContactDataSource();
    contactRepository = new ContactRepositoryImpl(mockContactDataSource);
  });

  describe(ContactRepositoryImpl.prototype.getContacts.name, () => {
    test("should return data", async () => {
      const expectedData = [
        {
          id: "1",
          surname: "Smith",
          firstName: "John",
          email: "john@gmail.com",
        },
      ];

      jest
        .spyOn(mockContactDataSource, "getAll")
        .mockImplementation(() => Promise.resolve(expectedData));

      const result = await contactRepository.getContacts();
      expect(result).toBe(expectedData);
    });

    describe(ContactRepositoryImpl.prototype.createContact.name, () => {
      test("should return true", async () => {
        const inputData = {
          id: "1",
          surname: "Smith",
          firstName: "John",
          email: "john@gmail.com",
        };

        jest
          .spyOn(mockContactDataSource, "create")
          .mockImplementation(() => Promise.resolve(true));

        const result = await contactRepository.createContact(inputData);

        expect(result).toBe(true);
      });
    });
  });
});
