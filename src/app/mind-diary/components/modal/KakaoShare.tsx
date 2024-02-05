import {useEffect, useState} from "react";
import Image from "next/image";
import ExtractGroupIdFromToken, {GroupIdFrom} from "@/components/init/extractGroupIdFromToken";

const KakaoShareButton = () => {
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

    // useEffect를 이용하여 컴포넌트 렌더링시 카카오 SDK 초기화 및 공유 버튼 생성
    useEffect(() => {
        if (typeof window !== "undefined" && window.Kakao) {
            const { Kakao } = window;

            if (!Kakao.isInitialized()) {
                // SDK 초기화 부분, 본인의 API KEY 입력
                window.Kakao.init("d2ca5ed77c193b88db21c0edfbaa61bf");
            }

            Kakao.Link.createDefaultButton({
                // #kakao-link-btn id를 가진 요소에 공유 버튼을 생성하도록 함
                container: "#kakao-link-btn",
                objectType: "text",
                text:
                    '마음일기에 초대합니다!',
                link: {
                    webUrl: shareUrl,
                    mobileWebUrl: shareUrl,
                }
            });
        }
    }, [shareUrl]);

    return (
        <>
            <div>
                <Image
                    // id를 kakao-link-btn으로 설정
                    id="kakao-link-btn"
                    src="/images/common/ico_invite1.png"
                    width={50}
                    height={50}
                    alt="카톡 공유 이미지"
                />
            </div>
        </>
    );
};

export default KakaoShareButton;
