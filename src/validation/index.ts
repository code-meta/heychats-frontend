import { z } from "zod";

export const createAccountSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required.")
    .min(2, "Username is too short.")
    .max(30, "Username is too large."),
  email: z.string().nonempty("Email is required.").email(),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "password is too short.")
    .max(64, "password is too large."),
});

export const loginSchema = z.object({
  email: z.string().nonempty("Email is Required.").email(),
  password: z.string().nonempty("Password is Required."),
});
