"use client";
import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";

import { useSearchParams } from "next/navigation";

import { CardWrapper } from "./card-wrapper";

import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import {newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
 const searchParams = useSearchParams();
 const token = searchParams.get("token");

const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values,token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);  
      });
    });

    console.log(values)
  };

  return (
    <CardWrapper
      headerLabel="Enter new Password"
      backButtonLabel="Go back to login"
      backButtonHref="/auth/login"
      
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
           Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
