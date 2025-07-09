import { forwardRef, useEffect, useRef, useState } from "react";
import { useWeddingImages } from "../hooks/useWeddingImages";
import s from "./film.module.css";
import classNames from "classnames";

interface Props {
	targetIndex?: number; // 스크롤할 대상 인덱스 (기본값: 마지막 이미지)
	duration?: number; // 스크롤 애니메이션 지속 시간 (밀리초, 기본값: 1000ms)
	className?: string;
}

export const Film = forwardRef<HTMLDivElement, Props>(
	({ targetIndex, duration = 1000, className }, _ref) => {
		const { filmImages } = useWeddingImages();
		const imageListRef = useRef<HTMLDivElement>(null);
		const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
		const filmRef = useRef<HTMLDivElement>(null);
		const [hasScrolled, setHasScrolled] = useState(false);
		const [isVisible, setIsVisible] = useState(false);
		const animationRef = useRef<number | null>(null);

		// 부드러운 스크롤 애니메이션 함수 (속도 제어 가능)
		const smoothScrollTo = (
			element: HTMLElement,
			targetLeft: number,
			duration: number
		) => {
			const startLeft = element.scrollLeft;
			const distance = targetLeft - startLeft;
			const startTime = performance.now();

			const animateScroll = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// easeInOutCubic 이징 함수로 부드러운 애니메이션
				const easeProgress =
					progress < 0.5
						? 4 * progress * progress * progress
						: 1 - Math.pow(-2 * progress + 2, 3) / 2;

				element.scrollLeft = startLeft + distance * easeProgress;

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(animateScroll);
				}
			};

			// 기존 애니메이션이 있다면 취소
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}

			animationRef.current = requestAnimationFrame(animateScroll);
		};

		// 특정 인덱스 위치로 스크롤하는 함수
		const scrollToIndex = (index: number) => {
			if (
				!imageListRef.current ||
				!imageRefs.current[index] ||
				hasScrolled
			) {
				return;
			}

			const targetElement = imageRefs.current[index];
			const container = imageListRef.current;

			if (targetElement) {
				const targetLeft = targetElement.offsetLeft;
				const targetWidth = targetElement.offsetWidth;
				const containerWidth = container.offsetWidth;

				// 선택된 이미지를 컨테이너 중앙에 위치시키기 위한 스크롤 위치 계산
				const scrollLeft =
					targetLeft - (containerWidth - targetWidth) / 2;

				// 커스텀 스크롤 애니메이션 실행
				smoothScrollTo(container, scrollLeft, duration);
				setHasScrolled(true);
			}
		};

		// 스크롤 실행 함수
		const executeScroll = () => {
			if (hasScrolled || !isVisible || filmImages.length === 0) {
				return;
			}

			const scrollIndex =
				targetIndex !== undefined ? targetIndex : filmImages.length - 1;

			if (scrollIndex >= 0 && scrollIndex < filmImages.length) {
				// 이미지 로딩을 기다리기 위한 딜레이
				setTimeout(() => {
					scrollToIndex(scrollIndex);
				}, 300);
			}
		};

		// 컴포넌트가 화면에 노출될 때 감지
		useEffect(() => {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsVisible(entry.isIntersecting);
				},
				{
					threshold: 0.1,
				}
			);

			if (filmRef.current) {
				observer.observe(filmRef.current);
			}

			return () => {
				if (filmRef.current) {
					observer.unobserve(filmRef.current);
				}
				if (animationRef.current) {
					cancelAnimationFrame(animationRef.current);
				}
			};
		}, []);

		// 이미지 개수가 변경될 때마다 refs 배열 초기화 및 스크롤 상태 리셋
		useEffect(() => {
			imageRefs.current = imageRefs.current.slice(0, filmImages.length);
			setHasScrolled(false);
		}, [filmImages.length]);

		// 컴포넌트가 보이고 이미지가 로딩되면 스크롤 실행
		useEffect(() => {
			if (isVisible && filmImages.length > 0) {
				executeScroll();
			}
		}, [isVisible, filmImages.length, targetIndex, duration]);

		const topTexts = (index: number) => {
			if (index === 0) return "WEDDING";
			if (index === 1)
				return (
					<span>
						<span className={s.icon}>▶</span> 2025.10.11
					</span>
				);
			return (
				<span>
					JUNGJAE <span className={s.icon}>♥</span> JAEHEE
				</span>
			);
		};

		const bottomTexts = (index: number) => {
			if (index === 0)
				return (
					<span>
						JUNGJAE <span className={s.icon}>♥</span> JAEHEE
					</span>
				);
			if (index === 1)
				return (
					<span>
						<span className={s.icon}>▶</span> 2025.10.11
					</span>
				);
			return "WEDDING";
		};

		return (
			<div className={classNames(s.film, className)} ref={filmRef}>
				<div className={s.imagesWrap} ref={imageListRef}>
					{filmImages.map((image, index) => (
						<div
							ref={(el) => {
								imageRefs.current[index] = el;
							}}
							className={s.imageItem}
						>
							<span className={s.topText}>
								{topTexts(index % 3)}
							</span>
							<img
								className={s.image}
								key={`film-${index}`}
								src={image}
								alt={`film-${index}`}
							/>
							<span className={s.bottomText}>
								{bottomTexts(index % 3)}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	}
);
