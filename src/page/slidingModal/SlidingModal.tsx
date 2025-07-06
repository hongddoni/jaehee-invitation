import { useState, useRef, memo } from "react";
import { Modal } from "../modal/Modal";
import s from "./slidingModal.module.css";
import classNames from "classnames";
import LeftIcon from "../../assets/icons/arrow_back_icon.svg";
import RightIcon from "../../assets/icons/arrow_next_icon.svg";

interface Props {
	opened: boolean;
	onClose: () => void;
	images: string[];
	selectedId: number;
}

export const SlidingModal = memo(
	({ opened, onClose, images, selectedId: defaultSelectedId }: Props) => {
		const [selectedId, setSelectedId] = useState(defaultSelectedId);
		const touchStartX = useRef<number>(0);
		const touchEndX = useRef<number>(0);

		const handleLeftClick = () => {
			if (selectedId === 0) {
				setSelectedId(images.length - 1);
				return;
			}
			setSelectedId(selectedId - 1);
		};

		const handleRightClick = () => {
			if (selectedId === images.length - 1) {
				setSelectedId(0);
				return;
			}
			setSelectedId(selectedId + 1);
		};

		// 터치 시작 시 좌표 저장
		const handleTouchStart = (e: React.TouchEvent) => {
			touchStartX.current = e.touches[0].clientX;
		};

		// 터치 종료 시 좌표 저장하고 스와이프 방향 판단
		const handleTouchEnd = (e: React.TouchEvent) => {
			touchEndX.current = e.changedTouches[0].clientX;
			handleSwipe();
		};

		// 스와이프 방향에 따라 이미지 변경
		const handleSwipe = () => {
			const swipeThreshold = 50; // 스와이프 감지 임계값
			const diff = touchStartX.current - touchEndX.current;

			if (Math.abs(diff) > swipeThreshold) {
				if (diff > 0) {
					// 왼쪽으로 스와이프 (다음 이미지)
					handleRightClick();
				} else {
					// 오른쪽으로 스와이프 (이전 이미지)
					handleLeftClick();
				}
			}
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				handleLeftClick();
			}
			if (e.key === "ArrowRight") {
				handleRightClick();
			}
		};

		return (
			<Modal opened={opened} onClose={onClose}>
				<div
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
					onKeyDown={handleKeyDown}
					className={s.modalContent}
				>
					<button
						className={classNames(s.button, s.leftButton)}
						onClick={handleLeftClick}
					>
						<img src={LeftIcon} alt="left" />
					</button>
					<img
						className={s.image}
						src={images[selectedId]}
						alt="selected"
					/>
					<button
						className={classNames(s.button, s.rightButton)}
						onClick={handleRightClick}
					>
						<img src={RightIcon} alt="right" />
					</button>
				</div>
			</Modal>
		);
	}
);
