import { Contact } from "../../../domain/entities/contact";
import { ContactDataSource, Database } from "../../interfaces";

export class MongoDBContactDataSource implements ContactDataSource {
  constructor(private database: Database) {}

  async create(contact: Contact): Promise<boolean> {
    const result = await this.database.insertOne(contact);
    return result !== null;
  }

  async getAll(): Promise<Contact[]> {
    const result = await this.database.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      surname: item.surname,
      firstName: item.firstName,
      email: item.email,
    }));
  }
}
