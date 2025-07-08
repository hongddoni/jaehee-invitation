import { useEffect, useRef, useState } from "react";
import s from "./ment.module.css";
import middle1 from "../../assets/images/middle/middle-1.png";
import flower from "../../assets/images/flower.png";
import { Film } from "../film/Film";
import { AnimateText } from "../animateText/AnimateText";

export const Ment = () => {
	const ref = useRef<HTMLImageElement>(null);
	const [height, setHeight] = useState(0);
	const [retryCount, setRetryCount] = useState(0);
	const maxRetries = 3;
	const isMobile = window.innerWidth < 768;

	const handleImageLoad = () => {
		if (ref.current && !isMobile) {
			console.log("mobile?");
			setHeight(ref.current.clientHeight);
		}
	};

	const handleImageError = () => {
		if (retryCount < maxRetries) {
			setRetryCount((prev) => prev + 1);
			setTimeout(() => {
				if (ref.current) {
					ref.current.src =
						ref.current.src + "?retry=" + (retryCount + 1);
				}
			}, 100);
		} else {
			console.log("최대 재시도 횟수 초과");
		}
	};

	useEffect(() => {
		if (ref.current && ref.current.complete) {
			setHeight(ref.current.clientHeight);
		}
	}, []);

	const ment = (
		<>
			<br />
			<AnimateText type="typewriter">
				"사랑은 서로를 바라보는 것이 아니라
				<br />
				함께 <strong>같은 방향을 바라보는 것</strong>이다."
				<br /> 『 어린 왕자 』
			</AnimateText>
			<br />
			<br />
			서로를 바라보던 두 사람이
			<br />
			이제 같은 방향을 바라보며
			<br />
			함께 걸어가려 합니다.
			<br />
			<br />
			새로운 시작의 자리에 함께해 주신다면
			<br />그 길의 첫 걸음이 더 든든해질 것 같습니다.
		</>
	);

	return (
		<div className={s.mentWrap}>
			<p className={s.ment}>{ment}</p>
			<div className={s.ring}>🤵🏻👰🏻‍♀️</div>

			<div className={s.nameWrap}>
				<div className={s.nameItem}>
					<span className={s.name}>
						신랑 <span className={s.bold}>심정재</span>
					</span>
					<span className={s.parent}>심창섭, 황희자의 차남 </span>
				</div>
				<div className={s.slash} />
				<div className={s.nameItem}>
					<span className={s.name}>
						신부 <span className={s.bold}>안재희</span>
					</span>
					<span className={s.parent}>
						<img src={flower} alt="flower" className={s.flower} />
						안선응, 강은경의 차녀
					</span>
				</div>
				{/* <div className={s.br} /> */}
			</div>
			<div
				className={s.imageWrap}
				style={{ height: isMobile ? "35vh" : height }}
			>
				{!isMobile && (
					<img
						src={middle1}
						alt="middle"
						className={s.middleImage}
						ref={ref}
						onLoad={handleImageLoad}
						onError={handleImageError}
					/>
				)}
				{isMobile && <Film duration={3000} targetIndex={9} />}
			</div>
		</div>
	);
};
