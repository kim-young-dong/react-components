import tw from "tailwind-styled-components";
import Image from "next/image";
export default function Card({
  children,
  title,
  imgUrl,
}: {
  children: React.ReactNode;
  title: string;
  imgUrl?: string;
}) {
  return (
    <>
      <CardContainer>
        <CardImage>
          <Image
            src={imgUrl || "https://via.placeholder.com/1000"}
            alt="card"
            width={1000}
            height={1000}
          />
        </CardImage>
        <CardContent>
          <h2>{title}</h2>
          <div>{children}</div>
        </CardContent>
      </CardContainer>
      {/* <div className="card card-compact w-full min-w-[250px] bg-base-100 shadow-xl relative">
        <figure>
          <img src={imgUrl || "https://via.placeholder.com/1000"} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          {children}
        </div>
      </div> */}
    </>
  );
}

const CardContainer = tw.div`
  card
  w-full min-w-[250px] min-h-[250px]
  flex flex-col items-center justify-center
  rounded-2xl drop-shadow-md bg-white
`;
const CardImage = tw.figure`
  flex items-center justify-center
  relative overflow-hidden rounded-t-2xl
`;
const CardContent = tw.div`
  w-full p-2
  flex flex-1 flex-col items-center justify-center gap-4
`;
