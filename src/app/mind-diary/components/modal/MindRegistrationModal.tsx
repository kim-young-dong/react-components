"use client";
import { useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import tw from "tailwind-styled-components";
import Image from "next/image";
import Button from "../Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { patchScore, MindItem } from "@/apis/api/mind";

const mindListReducer = (state: MindItem[], action: any) => {
  switch (action.type) {
    case "ADD":
      const additionalItem = {
        id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
        title: "",
        yunyeom: 0,
        munyeom: 0,
      };
      return [...state, additionalItem];
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    case "UPDATE":
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, title: action.title };
        } else {
          return item;
        }
      });
    case "SET":
      return action.mindList;
    default:
      return state;
  }
};

export default function MindRegistrationModal({
  isActive,
  currentMindList,
  toggleModal,
}: {
  isActive: boolean;
  currentMindList: MindItem[];
  toggleModal: () => void;
}) {
  const [mindList, dispatch] = useReducer(mindListReducer, []);
  useEffect(() => {
    dispatch({
      type: "SET",
      mindList: JSON.parse(localStorage.getItem("defaultMindList") || "[]"),
    });
  }, [currentMindList]);
  const router = useRouter();

  const addMindList = () => {
    dispatch({ type: "ADD" });
  };
  const deleteMind = (id?: number) => {
    dispatch({ type: "DELETE", id: id });
  };
  // 리스트 저장
  const saveMindList = async () => {
    localStorage.setItem("defaultMindList", JSON.stringify(mindList));
    mindList.forEach(async (mindItem: MindItem) => {
      const isNewItem = currentMindList.every(
        (item: MindItem) => item.id !== mindItem.id
      );
      if (isNewItem) {
        await patchScore("yunyeom", mindItem.title, true);
        await patchScore("munyeom", mindItem.title, true);
      }
    });
    location.reload();
    toggleModal();
  };

  return (
    <>
      <ModalContainer $isActive={isActive}>
        <Modal>
          <ModalHeader>
            <div>유무념 등록</div>
            <button className=" relative w-5 h-5" onClick={toggleModal}>
              <Image
                src="/images/common/x-01.png"
                alt="프로필 이미지"
                fill={true}
              />
            </button>
          </ModalHeader>

          <div className="w-full h-full flex flex-col gap-3">
            {mindList.map((item: MindItem) => (
              <ModalContent key={item.id}>
                <input
                  className="w-full h-full px-4 flex-1 text-lg font-normal outline outline-1 outline-gray-400"
                  type="text"
                  placeholder="개별생성"
                  value={item.title}
                  onInput={(e) => {
                    dispatch({
                      type: "UPDATE",
                      id: item.id,
                      title: e.currentTarget.value,
                    });
                  }}
                />
                <FaRegTrashAlt
                  size={24}
                  color="gray"
                  onClick={() => deleteMind(item.id)}
                />
              </ModalContent>
            ))}
          </div>
          <div className="w-full flex flex-col gap-2">
            <span onClick={() => addMindList()}>
              <Button type="outline" text="항목추가">
                <div className="w-16 h-16 flex justify-center items-center text-gray-500 text-4xl font-extralight">
                  +
                </div>
              </Button>
            </span>
            <span onClick={saveMindList}>
              <Button type="default" text="유무념 저장" />
            </span>
          </div>
        </Modal>
      </ModalContainer>
    </>
  );
}

const ModalContainer = tw.div`
  mind_modal_container
  ${({ $isActive }: { $isActive: boolean }) =>
    $isActive
      ? `opacity-100 visible pointer-events-auto`
      : `opacity-0 invisible  pointer-events-none`}
  w-full h-full overflow-y-auto
  flex flex-col
  transition-all duration-300
  absolute top-0 left-0
  text-black bg-black bg-opacity-50
`;
const Modal = tw.div`
  mind_modal
  w-full h-fit mt-auto
  py-4 px-6
  flex flex-col items-center
  bg-white rounded-t-2xl 
`;
const ModalHeader = tw.div`
  w-full h-10
  flex items-center justify-between
  text-gray-500
`;
const ModalContent = tw.div`
  mind_modal_content
  w-full h-16
  flex justify-between items-center gap-4
`;

const BackGround = tw.div`
  back_ground
  w-full h-full
  absolute
  top-0 left-0
  bg-black
  bg-opacity-70
`;
