import { MongoClient } from "mongodb";
import { Database } from "./data/interfaces";
import { ContactRouter } from "./presentation/routers";
import { GetAllContacts } from "./domain/use-cases";
import { CreateContact } from "./domain/use-cases/contacts/create-contact";
import { ContactRepositoryImpl } from "./domain/repositories/contact-repository";
import { MongoDBContactDataSource } from "./data/data-sources";
import server from "./server";

const run = async () => {
  const client: MongoClient = new MongoClient(
    "mongodb://localhost:27017/contacts"
  );
  await client.connect();
  const db = client.db("CONTACTS_DB");

  const contactDatabase: Database = {
    find: (query) => db.collection("contacts").find(query).toArray(),
    insertOne: (doc) => db.collection("contacts").insertOne(doc),
  };

  const contactRepository = new ContactRepositoryImpl(
    new MongoDBContactDataSource(contactDatabase)
  );

  const contactMiddleware = ContactRouter(
    new GetAllContacts(contactRepository),
    new CreateContact(contactRepository)
  );

  server.use("/contact", contactMiddleware);
  server.listen(4000, () => console.log("running on server"));
};

run();
