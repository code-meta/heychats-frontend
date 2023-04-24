import {
  ButtonPrimary,
  ButtonSecondary,
  Divider,
  FormHeading,
  PasswordLinkInput,
  ProductPreview,
  TextInput,
} from "#/components";
import React, { useState } from "react";
import { useRouter } from "next/router";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <section className="md:flex">
      {/* form  */}
      <div className="md:flex-1 bg-form-bg-blob min-h-screen bg-no-repeat bg-contain">
        <form
          className="max-w-[320px] ml-[10%] pt-[10%]"
          onSubmit={handleLogin}
        >
          <FormHeading heading="Create account" />

          <div className="flex flex-col gap-4 mt-6">
            <TextInput
              type="text"
              inputId="username"
              value={username}
              labelText="Username"
              placeholder="Your username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextInput
              type="email"
              inputId="email"
              value={email}
              labelText="Email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              type="password"
              inputId="password"
              value={password}
              labelText="Password"
              placeholder="***********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <ButtonPrimary text="Create my account" type="submit" />
            <Divider />
            <ButtonSecondary
              text="Login"
              type="button"
              onClick={() => router.push("/login")}
            />
          </div>
        </form>
      </div>

      {/* product preview */}
      <div className="text-base-content md:flex-1 md:self-center">
        <ProductPreview />
      </div>
    </section>
  );
};

export default CreateAccount;
