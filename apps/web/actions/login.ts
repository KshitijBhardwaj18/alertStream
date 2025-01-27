"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { LoginSchema } from "../schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser =  await getUserByEmail(email);

  if(!existingUser || !existingUser.password || !existingUser.email){
    return {error: "Email does not exist Credentials"}
  }

  if(!existingUser.emailVerified){
    const verficationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verficationToken.email,verficationToken.token);

    return {success : "Confirmation mail Sent"}
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
  
};
