import { useRouter } from "next/router";
import React from "react";
import FormHeading from "../shared/FormHeading";
import ButtonPrimary from "../shared/ButtonPrimary";
import ButtonSecondary from "../shared/ButtonSecondary";
import TextInput from "../shared/TextInput";
import FormFieldError from "../shared/FormFieldError";
import { IFormErrors } from "#/types";
import { createAccountSchema } from "#/validation";
import { z } from "zod";
import { FieldErrors } from "react-hook-form";
import Divider from "../shared/Divider";

type FormData = z.infer<typeof createAccountSchema>;

interface IPropTypes {
  handleSubmit: Function;
  handleCreateAccount: (data: FormData) => Promise<void>;
  register: unknown;
  processingUser: boolean;
  formErrors: IFormErrors;
  errors: FieldErrors<FormData>;
}

const CreateAccountForm = ({
  handleSubmit,
  handleCreateAccount,
  register,
  processingUser,
  formErrors,
  errors,
}: IPropTypes) => {
  const router = useRouter();

  return (
    <form
      className="sm:max-w-[320px] w-[90%] m-auto sm:ml-[10%] sm:pt-[10%] pt-[5%]"
      onSubmit={handleSubmit(handleCreateAccount)}
      noValidate
    >
      <FormHeading heading="Create account" />

      <div className="flex flex-col gap-4 mt-6">
        <TextInput
          type="text"
          inputId="username"
          labelText="Username"
          placeholder="Your username"
          register={register}
        />

        {errors.username?.message && (
          <FormFieldError error={errors.username.message} />
        )}

        {formErrors?.username && (
          <FormFieldError error={formErrors?.username[0]} />
        )}

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

        {formErrors?.email && <FormFieldError error={formErrors?.email[0]} />}

        <TextInput
          type="password"
          inputId="password"
          labelText="Password"
          placeholder="minium 8 characters"
          register={register}
        />

        {errors.password?.message && (
          <FormFieldError error={errors.password.message} />
        )}

        {formErrors?.password && (
          <FormFieldError error={formErrors?.password[0]} />
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <ButtonPrimary
          text={processingUser ? "Processing..." : "Create my account"}
          type="submit"
        />
        <Divider />
        <ButtonSecondary
          text="Login"
          type="button"
          onClick={() => router.push("./login")}
        />
      </div>
    </form>
  );
};

export default CreateAccountForm;
