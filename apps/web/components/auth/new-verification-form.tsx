"use client";
import { BeatLoader } from "react-spinners";
import { Suspense, useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParam = useSearchParams();

  const token = searchParam.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }
    newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    }).catch((error) => {
        setError("Something went wrong")
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && ( <BeatLoader />)}
       
        <FormSuccess message={success}/>
        <FormError message={error}/>
      </div>
    </CardWrapper>
  );
};

const NewVerificationWrapper = () => (
  
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  
)

export default NewVerificationWrapper;
