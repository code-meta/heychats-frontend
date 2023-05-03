import Image from "next/image";

const ProductPreview = (): JSX.Element => {
  return (
    <>
      <h3 className="text-primary font-lato font-semibold text-lg mb-4 select-none">
        Get the best chat experience with{" "}
        <span className="text-secondary">hey</span>
        <span>chats</span>
      </h3>
      <Image
        src="/heychats-preview.svg"
        alt="heychats-preview-image"
        width={500}
        height={500}
        className="w-[90%] max-w-[500px] h-auto border-primary border-[3px] rounded-sm select-none"
      />
    </>
  );
};

export default ProductPreview;
