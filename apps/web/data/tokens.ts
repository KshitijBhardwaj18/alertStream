import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verificatonToken";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "./passwoed-reset-token";

export const generateResetVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const resetVerificationToken = db.resetPasswordToken.create({
    data: {
      email,
      token,
      
      expires,
    },
  });

  return resetVerificationToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verficationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.verficationToken.create({
    data: {
      token,
      expires: expires,
      email: email,
    },
  });

  return verficationToken;
};
