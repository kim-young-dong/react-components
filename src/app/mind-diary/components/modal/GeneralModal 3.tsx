import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import tw from "tailwind-styled-components";

export default function DefaultModal() {
  const { isActive, modalText, type, onConfirm, onCancle } =
    useContext(ModalContext);
  return (
    <>
      <ModalContainer $isActive={isActive}>
        <Modal>
          <div className="w-full flex text-center">{modalText}</div>
          <ButtonGroup>
            <ModalButton onClick={onConfirm}>확인</ModalButton>
            {type === "confirmAndCancle" && (
              <ModalButton className="bg-red-500" onClick={onCancle}>
                취소
              </ModalButton>
            )}
          </ButtonGroup>
        </Modal>
        <BackGround />
      </ModalContainer>
    </>
  );
}

const ModalContainer = tw.div`
  default_modal_container
  ${({ $isActive }: { $isActive: boolean }) =>
    $isActive ? `flex items-center justify-center z-20` : `hidden`}
  w-full h-full
  absolute top-0 left-0
  text-black
`;
const Modal = tw.div`
  default_modal
  w-[80%] min-w-[260px] h-fit min-h-[260px] z-10
  p-5
  flex flex-col justify-end items-center gap-10
  bg-white rounded-2xl 
  text-lg font-bold
`;
const ButtonGroup = tw.div`
  w-full h-20
  flex justify-around items-center gap-2
`;
const ModalButton = tw.button`
  modal_button
  w-1/2 h-12
  flex justify-center items-center
  text-white
  rounded-xl
  bg-primary
`;
const BackGround = tw.div`
  w-full h-full
  absolute
  top-0 left-0
  bg-black
  bg-opacity-70
`;
