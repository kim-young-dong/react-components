import Carousel from "./components/Carousel/Carousel";
const images = [
  "https://via.placeholder.com/1040",
  "https://via.placeholder.com/1040",
  "https://via.placeholder.com/1040",
];
export default function MindDiary() {
  return (
    <>
      <Carousel images={images} />
    </>
  );
}
