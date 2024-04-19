import Joi from "joi";

interface Search {
  query: string;
  limit: number;
  offset: number;
  kind: "ALL" | "TRACKS" | "ARTISTS" | "ALBUMS";
  filters: {
    genres: string[];
    styles: string[];
  };
}

export const searchSchema = Joi.object<Search>({
  query: Joi.string().required().min(0),
  limit: Joi.number(),
  offset: Joi.number(),
  kind: Joi.string().valid("ALL", "TRACKS", "ARTISTS", "ALBUMS"),
  filters: Joi.object({
    genres: Joi.array().items(Joi.string()),
    styles: Joi.array().items(Joi.string()),
  }),
});
