"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/data/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already Taken" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verficationToken = await generateVerificationToken(email);

  // TO DO send verifiacation token email
  await sendVerificationEmail(verficationToken.email, verficationToken.token );

  return { success: "Confirmation mail sent" };
};
