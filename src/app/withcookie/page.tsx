import ImageUploader from "./components/ImageUploader";
import Pagination from "./components/Pagination";

export default function WithCookie() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <h1>WithCookie</h1>
        <div className="w-1/2">
          <ImageUploader />
        </div>
        <Pagination maxPage={50} />
      </div>
    </>
  );
}
