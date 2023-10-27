import { ContactRepository } from "../../_interfaces/repositories";
import { Contact } from "../../entities/contact";
import { GetAllContacts } from "./get-all-contacts";

class MockContactRepository implements ContactRepository {
  createContact(contact: Contact): Promise<boolean> {
    throw Error("not implemented");
  }

  getContacts(): Promise<Contact[]> {
    throw Error("not implemented");
  }
}

describe("Get All Contacts Use Case", () => {
  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  test("should return data", async () => {
    const expectedResult = [
      { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" },
    ];

    jest
      .spyOn(mockContactRepository, "getContacts")
      .mockImplementation(() => Promise.resolve(expectedResult));
    const getAllContactsUseCase = new GetAllContacts(mockContactRepository);
    const result = await getAllContactsUseCase.execute();
    expect(result).toStrictEqual(expectedResult);
  });
});
