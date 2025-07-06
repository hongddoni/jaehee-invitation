import naverMap from "../../assets/maps/naver.webp";
import google from "../../assets/maps/google.png";
import tMap from "../../assets/maps/tmap.svg";
import s from "./mapButtons.module.css";
import { LinkButton } from "./linkButton/LinkButton";
import { AnimateText } from "../animateText/AnimateText";

const WEDDING_HOLE_NAVER = "https://naver.me/xLsCbfGO";

const WEDDING_HOLE_GOOGLE =
	"https://maps.app.goo.gl/X24X6P1qAJvw1dpi9?g_st=ipc";

const WEDDING_HOLE_TMAP = "https://tmap.life/1a06db15";

export const MapsButton = () => {
	return (
		<div className={s.buttonWrap}>
			<div className={s.weddingInfo}>
				<AnimateText className={s.text}>
					Wedding Information
				</AnimateText>
				<div className={s.date}>25년 10월 11일(토) 14시 30분</div>
				<div className={s.hole}>그랜드힐 컨벤션 2층 사브리나홀</div>
				<span className={s.location}>
					서울 강남구 역삼로 607 그랜드힐 컨벤션
				</span>
				<span className={s.tel}>
					<a href={"tel:02-6964-7889"}>Tel. 02-6964-7889</a>
				</span>
			</div>
			<div className={s.map}>
				<div className={s.mapName}>
					<div className={s.transport}>
						<span className={s.left}>지하철</span>
						<span className={s.right}>
							{`2호선 삼성역 1번출구 - 셔틀버스 운행
2호선 삼성역 2번출구 - 도보 5분`}
						</span>
					</div>
					<br />
					<div className={s.transport}>
						<span className={s.left}>버스</span>
						<span className={s.right}>
							{`간선(파란버스)
143, 146, 341, 360, 363, 401
지선(초록버스)
2413, 3411, 3422, 4318, 4419, 917, 1-3`}
						</span>
					</div>
					<br />

					<div className={s.transport}>
						<span className={s.left}>자가용</span>
						<span className={s.right}>
							그린드힐컨벤션 주차장(3시간 무료)
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
