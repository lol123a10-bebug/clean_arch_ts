import { ContactRepository } from "../../_interfaces/repositories";
import { Contact } from "../../entities/contact";
import { CreateContact } from "./create-contact";

class MockContactRepository implements ContactRepository {
  createContact(contact: Contact): Promise<boolean> {
    throw Error("not imp");
  }

  getContacts(): Promise<Contact[]> {
    throw Error("not imp");
  }
}

describe("Create Contact use case", () => {
  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  test("should return true", async () => {
    const inputData = {
      id: "1",
      surname: "Smith",
      firstName: "John",
      email: "john@gmail.com",
    };

    jest
      .spyOn(mockContactRepository, "createContact")
      .mockImplementation(() => Promise.resolve(true));
    const createContactUseCase = new CreateContact(mockContactRepository);
    const result = await createContactUseCase.execute(inputData);
    expect(result).toBe(true);
  });
});
