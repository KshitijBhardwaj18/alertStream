import { db } from "@/lib/db";

export const getVerificationTokenByToken = (token: string) => {
    try {
      const  verificationtoken = db.verficationToken.findUnique({
        where: {
          token,
        },
      });

      return verificationtoken;
    } catch {return null;}
  };
  

export const getVerificationTokenByEmail = (email: string) => {
  try {
    const verificationtoken = db.verficationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationtoken;
  } catch {return null;}
};
