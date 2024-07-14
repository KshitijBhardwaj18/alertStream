"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

import { sendResetVerificationEmail } from "@/lib/mail";

import { generateVerificationToken } from "@/data/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email } = validatedFields.data;

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return { erorr: "Email not found" };
  }

  const ResetToken = await generateVerificationToken(email);
  
  
  await sendResetVerificationEmail(ResetToken.email, ResetToken.token);
  return { success: "Reset Email is sent" };
  
}





