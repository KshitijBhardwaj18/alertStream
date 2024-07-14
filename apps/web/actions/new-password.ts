"use server";
import * as z from "zod";
import { PasswordSchema } from "@/schemas";

import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/passwoed-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: z.infer<typeof PasswordSchema>,
  token: string | null 
) => {
  if (!token) {
    return { error: "Missing Token" };
  }
  const validatedFields = PasswordSchema.safeParse(values);
  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  const  password  = validatedFields.data?.password || "hello";

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.resetPasswordToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {success: "Password updated!"}
};
