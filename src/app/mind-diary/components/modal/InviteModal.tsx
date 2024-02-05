"use client";

import tw from "tailwind-styled-components";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import KakaoShareButton from "@/components/modal/KakaoShare";
import {useEffect, useState} from "react";
import ExtractGroupIdFromToken, {GroupIdFrom} from "@/components/init/extractGroupIdFromToken";

interface Invitee {
    name: string;
    phone: string;
}

const inviteeList: Invitee[] = [
    {
        name: "김민수",
        phone: "010.1234.5678",
    },
    {
        name: "김민수",
        phone: "010.1234.5678",
    },
    {
        name: "김민수",
        phone: "010.1234.5678",
    },
];

const defaultMessage =
    "원불교 청년회 그룹에 초대합니다.\n연결 링크를 눌러 멤버가 되어 주세요.\n\n from. 박여주";

const copyToClipboard = (copyUrl: string) => {
    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(copyUrl)
            .then(() => {
                alert("클립보드에 복사되었습니다!");
            })
            .catch(() => {
                alert("복사를 다시 시도해주세요.");
            });
    }
};

const InviteType = () => {
    const [groupIdForm, setGroupIdForm] = useState<GroupIdFrom | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        if (typeof window !== "undefined") {
            const profile = ExtractGroupIdFromToken();
            setGroupIdForm(profile);
        }
    }, []);

    // 현재 페이지 URL 저장, 이는 공유 버튼 클릭시 열리는 페이지의 주소로 사용됨
    const shareUrl = `https://mdiary.co.kr/auth/register?inviteGroupId=${groupIdForm?.leaderGroupId}`;

    return (
        <>
            <div className="w-full mt-4 mb-8 flex gap-4">
                <div className="flex flex-col items-center gap-1">
                    <KakaoShareButton/>
                    <span className="text-xs font-light">카카오톡</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Image
                        src="/images/common/ico_invite2.png"
                        alt="클립보드 아이콘"
                        width={50}
                        height={50}
                        onClick={() => copyToClipboard(shareUrl)}
                    />
                    <span className="text-xs font-light">초대링크 복사</span>
                </div>
            </div>
        </>
    );
};

const InviteBadge = ({invitee}: { invitee: Invitee }) => {
    return (
        <>
            <div className="w-[48%] pl-4 pr-2 py-2 flex justify-between items-center rounded-full bg-thirdary">
                <div className="flex flex-col">
                    <span className="text-sm">{invitee.name}</span>
                    <span className="text-xs text-gray-400">{invitee.phone}</span>
                </div>
                <button className="relative w-6 h-6 p-1.5 bg-thirdary-dark rounded-full">
                    <Image
                        src="/images/common/x-02.png"
                        alt="닫기"
                        width={28}
                        height={28}
                    />
                </button>
            </div>
        </>
    );
};

const SearchType = () => {
    return (
        <>
            <div className="w-full pt-6 mt-4 flex flex-col gap-6 border-t-[1px]">
                <div className="invitee flex flex-col gap-2">
                    <span className="pl-2 text-sm text-gray-500">초대대상</span>
                    <div className="flex flex-wrap justify-between gpa-4 gap-y-2">
                        {inviteeList.map((invitee: Invitee, index: number) => (
                            <InviteBadge key={index} invitee={invitee}/>
                        ))}
                    </div>
                </div>
                <div className="invite_message flex flex-col gap-2">
                    <span className="pl-2 text-sm text-gray-500">초대메세지</span>
                    <textarea
                        className="w-full h-32 p-3 text-sm border-[1px] border-gray-700"
                        name="초대메시지"
                        defaultValue={defaultMessage}
                    />
                </div>
                {/* API 호출로 가야함 */}
                <Link href="/main/group/invite">
                    <Button text="발송"/>
                </Link>
            </div>
        </>
    );
};

export default function InviteModal({
                                        isActive,
                                        toggleModal,
                                        type,
                                    }: {
    isActive: boolean;
    toggleModal: () => void;
    type?: string;
}) {
    return (
        <>
            <ModalContainer $isActive={isActive}>
                <Modal>
                    <ModalHeader>
                        <div>
                            {type === "invite" ? (
                                "함께 할 멤버를 초대해보세요."
                            ) : (
                                <div className="flex flex-col">
                                    <span>맴버초대</span>
                                    <span className="text-sm text-yellow-900">
                    새로운 맴버를 초대합니다.
                  </span>
                                </div>
                            )}
                        </div>
                        <button className=" relative w-5 h-5" onClick={toggleModal}>
                            <Image src="/images/common/x-01.png" alt="닫기" fill={true}/>
                        </button>
                    </ModalHeader>
                    {type === "invite" ? <InviteType/> : <SearchType/>}
                </Modal>
                <BackGround/>
            </ModalContainer>
        </>
    );
}

const ModalContainer = tw.div`
  invite_modal
  ${({$isActive}: { $isActive: boolean }) =>
    $isActive
        ? `opacity-100 visible pointer-events-auto`
        : `opacity-0 invisible  pointer-events-none`}
  transition-all duration-300
  flex items-center justify-center 
  absolute
  top-0 left-0 w-full h-full
  text-black
`;
const Modal = tw.div`
  w-full z-50
  pt-6 pb-4 px-6
  flex flex-col items-center
  absolute
  bottom-0 left-0
  bg-white rounded-t-2xl 
`;
const ModalHeader = tw.div`
  w-full h-10
  flex justify-between
  text-gray-900
`;
const ModalContent = tw.div`
  w-full
  h-16
  flex justify-between items-center gap-4
`;

const BackGround = tw.div`
  w-full h-full
  absolute
  top-0 left-0
  bg-black
  bg-opacity-70
`;
