import Pagination from "./components/Pagination";

export default function WithCookie() {
  return (
    <>
      <h1>WithCookie</h1>
      <Pagination maxPage={50} />
    </>
  );
}
