import { CreateAccountForm, ProductPreview, UploadProfile } from "#/components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createAccountSchema } from "#/validation";
import { IFormErrors } from "#/types";
import { withOutAuth } from "#/services";
import { useHandleCreateAccount, useHandleUploadProfile } from "#/hooks";

type FormData = z.infer<typeof createAccountSchema>;

const CreateAccount = (): JSX.Element => {
  // local states
  const [uploadProfile, setUploadPofile] = useState(false);
  const [profileView, setProfileView] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});
  const [processingUser, setProcessingUser] = useState(false);

  // hooks
  const [handleCreateAccount] = useHandleCreateAccount({
    setFormErrors,
    setProcessingUser,
    setUploadPofile,
  });

  const [handleUploadProfile] = useHandleUploadProfile({ profileView });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createAccountSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <section className="md:flex">
      {/* form  */}
      <div className="md:flex-1 bg-form-bg-blob min-h-screen bg-no-repeat bg-contain">
        {!uploadProfile ? (
          <CreateAccountForm
            errors={errors}
            formErrors={formErrors}
            handleSubmit={handleSubmit}
            handleCreateAccount={handleCreateAccount}
            processingUser={processingUser}
            register={register}
          />
        ) : (
          <UploadProfile
            handleUploadProfile={handleUploadProfile}
            profileView={profileView}
            setProfileView={setProfileView}
          />
        )}
      </div>

      {/* product preview */}
      <div className="text-base-content md:block md:flex-1 md:self-center hidden">
        <ProductPreview />
      </div>
    </section>
  );
};

export default withOutAuth(CreateAccount);
