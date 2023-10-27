import { ContactDataSource } from "../../data/interfaces";
import { ContactRepository } from "../_interfaces/repositories";
import { Contact } from "../entities/contact";

export class ContactRepositoryImpl implements ContactRepository {
  constructor(private contactDataSource: ContactDataSource) {}

  async createContact(contact: Contact): Promise<boolean> {
    const result = await this.contactDataSource.create(contact);
    return result;
  }

  async getContacts(): Promise<Contact[]> {
    const result = await this.contactDataSource.getAll();
    return result;
  }
}
