import { ContactRepository } from "../../_interfaces/repositories";
import { GetAllContactsUseCase } from "../../_interfaces/use-cases";
import { Contact } from "../../entities/contact";

export class GetAllContacts implements GetAllContactsUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute(): Promise<Contact[]> {
    const result = await this.contactRepository.getContacts();
    return result;
  }
}
