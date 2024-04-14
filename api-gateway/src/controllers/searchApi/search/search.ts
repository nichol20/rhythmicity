import { Request, Response } from "express";
import { searchClient } from "../../../servers/searchApi";
import { searchSchema } from "../../../validators/searchApi/search";

export default function search(req: Request, res: Response) {
  const { error: validationErr, value } = searchSchema.validate(req.body);
  if (validationErr) {
    return res.status(400).json({ message: validationErr.message });
  }
  searchClient.Search(
    {
      query: value.query,
      limit: value.limit,
      offset: value.offset,
      kind: value.kind,
      filters: value.filters,
    },
    (err, value) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }

      return res.status(200).json(value);
    }
  );
}
