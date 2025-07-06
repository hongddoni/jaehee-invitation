import naverMap from "../../assets/maps/naver.webp";
import google from "../../assets/maps/google.png";
import tMap from "../../assets/maps/tmap.svg";
import s from "./mapButtons.module.css";
import { LinkButton } from "./linkButton/LinkButton";
import { AnimateText } from "../animateText/AnimateText";

const WEDDING_HOLE_NAVER =
	"https://map.naver.com/p/entry/place/12077860?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506262326&locale=ko&svcName=map_pcv5L";

const WEDDING_HOLE_GOOGLE =
	"https://www.google.com/maps/place/%EB%8D%94+%ED%85%8C%EB%9D%BC%EC%8A%A4+%EC%9B%A8%EB%94%A9+%26+%ED%8C%8C%ED%8B%B0/data=!3m1!4b1!4m6!3m5!1s0x357c9ac9f99b176b:0xda0eeb1429a7f5e!8m2!3d37.6443318!4d126.7876533!16s%2Fg%2F1thw4nwj?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D";

const WEDDING_HOLE_TMAP = "https://tmap.life/2cd44420";

export const MapsButton = () => {
	return (
		<div className={s.buttonWrap}>
			<div className={s.weddingInfo}>
				<AnimateText className={s.text}>
					Wedding Information
				</AnimateText>
				<div className={s.date}>25. 10. 11(토) 오후 2시 30분</div>
				<div className={s.hole}>그랜드힐 컨벤션 2층 사브리나홀</div>
				<span className={s.location}>
					서울 강남구 역삼로 607 그랜드힐 컨벤션
				</span>
			</div>
			<div className={s.map}>
				<div className={s.mapName}>
					<div className={s.transport}>
						<span className={s.left}>지하철</span>
						<span className={s.right}>
							2호선 삼성역 2번 출구 도보 10분
						</span>
					</div>

					<div className={s.transport}>
						<span className={s.left}>셔틀 버스</span>
						<span className={s.right}>
							2호선 삼성역 1번 출구 셔틀버스 운행
							<br />
							(예식에 한하여 상시 운행)
						</span>
					</div>
				</div>
			</div>
			<div className={s.buttons}>
				<LinkButton
					url={WEDDING_HOLE_NAVER}
					imageUrl={naverMap}
					className={s.button}
				>
					<span>네이버 지도</span>
				</LinkButton>
				<hr />
				<LinkButton
					url={WEDDING_HOLE_GOOGLE}
					imageUrl={google}
					className={s.button}
				>
					<span>구글 지도</span>
				</LinkButton>
				<hr />

				<LinkButton
					url={WEDDING_HOLE_TMAP}
					imageUrl={tMap}
					className={s.button}
				>
					<span>티맵</span>
				</LinkButton>
			</div>
		</div>
	);
};
