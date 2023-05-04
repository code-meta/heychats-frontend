import {
  ButtonPrimary,
  ButtonSecondary,
  Divider,
  FormFieldError,
  FormHeading,
  PasswordLinkInput,
  ProductPreview,
  TextInput,
} from "#/components";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "#/validation";
import { withOutAuth } from "#/services";
import { IFormErrors } from "#/types";
import { useHandleLogin } from "#/hooks";

type FormData = z.infer<typeof loginSchema>;

const Login = (): JSX.Element => {
  // local states
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  // hooks
  const router = useRouter();
  const [handleLogin] = useHandleLogin({ setFormErrors });

  return (
    <section className="md:flex">
      {/* form  */}
      <div className="md:flex-1 bg-form-bg-blob min-h-screen bg-no-repeat bg-contain">
        <form
          className="sm:max-w-[320px] w-[90%] m-auto sm:ml-[10%] sm:pt-[10%] pt-[5%]"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          <FormHeading heading="Login to my account" />

          <div className="flex flex-col gap-4 mt-6">
            <TextInput
              type="email"
              inputId="email"
              labelText="Email"
              placeholder="example@gmail.com"
              register={register}
            />

            {errors.email?.message && (
              <FormFieldError error={errors.email.message} />
            )}

            {formErrors?.email && (
              <FormFieldError error={formErrors?.email[0]} />
            )}

            <PasswordLinkInput
              type="password"
              inputId="password"
              labelText="Password"
              placeholder="***********"
              register={register}
            />

            {errors.password?.message && (
              <FormFieldError error={errors.password.message} />
            )}

            {formErrors?.password && (
              <FormFieldError error={formErrors?.password[0]} />
            )}

            {formErrors?.non_field_errors && (
              <FormFieldError error={formErrors?.non_field_errors[0]} />
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <ButtonPrimary text="Login" type="submit" />
            <Divider />
            <ButtonSecondary
              text="Create an account"
              type="button"
              onClick={() => router.push("./create-account")}
            />
          </div>
        </form>
      </div>

      {/* product preview */}
      <div className="text-base-content md:block md:flex-1 md:self-center hidden">
        <ProductPreview />
      </div>
    </section>
  );
};

export default withOutAuth(Login);
