import React from "react";
import Image from "next/image";
import ButtonPrimarySmall from "../shared/ButtonPrimarySmall";
import ButtonSuccessSmall from "../shared/ButtonSuccessSmall";
import { IMAGE_URL } from "#/config";
import { IconnectionData } from "#/types";
import { useHandleCreateConnection } from "#/hooks";

interface IPropTypes {
  connection: IconnectionData;
  isConnected: boolean;
  setIsConnected: Function;
}

const ConnectionCard = ({
  connection,
  isConnected,
  setIsConnected,
}: IPropTypes) => {
  const [handleCreateConnection] = useHandleCreateConnection({
    connection,
    setIsConnected,
  });

  return (
    <div className="flex items-center justify-between max-w-[500px] w-[95%] bg-neutral px-4 py-3 roudned-[6px] mx-auto mt-[3rem]">
      <div className="flex items-center gap-3">
        {connection.profile ? (
          <Image
            src={`${IMAGE_URL}${connection.profile}`}
            alt="profile-pic"
            width={46}
            height={46}
            className="rounded-full w-[46px] h-[46px] object-cover"
          />
        ) : (
          <div className="rounded-full w-[46px] h-[46px] p-1 bg-base-100 flex items-center justify-center">
            <h4 className="uppercase font-open-sans font-bold text-lg text-base-content select-none">
              {connection.username?.slice(0, 2)}
            </h4>
          </div>
        )}

        <h4 className="text-base-content font-open-sans font-medium text-lg">
          {connection.username}
        </h4>
      </div>
      <div>
        {!isConnected ? (
          <ButtonPrimarySmall text="Connect" onClick={handleCreateConnection} />
        ) : (
          <ButtonSuccessSmall text="Connected" />
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
