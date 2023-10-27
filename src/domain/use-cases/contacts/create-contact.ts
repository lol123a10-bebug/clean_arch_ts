import { ContactRepository } from "../../_interfaces/repositories";
import { CreateContactUseCase } from "../../_interfaces/use-cases";
import { Contact } from "../../entities/contact";

export class CreateContact implements CreateContactUseCase {
  constructor(private contactRespoitory: ContactRepository) {}

  async execute(contact: Contact): Promise<boolean> {
    const result = await this.contactRespoitory.createContact(contact);
    return result;
  }
}
