import express, { Request, Response } from "express";

import {
  CreateContactUseCase,
  GetAllContactsUseCase,
} from "../../domain/_interfaces/use-cases";

export function ContactRouter(
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const contacts = await getAllContactsUseCase.execute();
      res.send(contacts);
    } catch (err) {
      res.status(500).send({ message: "error fetching data" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      await createContactUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "created" });
    } catch (err) {
      res.status(500).send({ message: "Error saving data" });
    }
  });

  return router;
}
