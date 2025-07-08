import { useEffect, useRef, useState } from "react";
import s from "./photoBooth.module.css";
import classNames from "classnames";

interface Props {
	images: string[];
}

export const PhotoBooth = ({ images }: Props) => {
	const [selectedId, setSelectedId] = useState<number>(0);
	const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
	const viewImageRef = useRef<HTMLUListElement>(null);
	const photoListRef = useRef<HTMLDivElement>(null);

	// 이미지 개수가 변경될 때마다 refs 배열 초기화
	useEffect(() => {
		imageRefs.current = imageRefs.current.slice(0, images.length);
	}, [images.length]);

	useEffect(() => {
		if (viewImageRef.current) {
			viewImageRef.current.style.transform = `translateX(${
				selectedId * -100
			}%)`;
		}
	}, [selectedId]);

	const onImageChange = (index: number) => {
		setSelectedId(index);
		// 부모 컨테이너에서 직접 스크롤 위치 조작 (외부 스크롤에 영향 없음)
		if (photoListRef.current && imageRefs.current[index]) {
			const targetElement = imageRefs.current[index];
			const container = photoListRef.current;

			if (targetElement) {
				const targetLeft = targetElement.offsetLeft;
				const targetWidth = targetElement.offsetWidth;
				const containerWidth = container.offsetWidth;

				// 선택된 이미지를 컨테이너 중앙에 위치시키기 위한 스크롤 위치 계산
				const scrollLeft =
					targetLeft - (containerWidth - targetWidth) / 2;

				container.scrollTo({
					left: scrollLeft,
					behavior: "smooth",
				});
			}
		}
	};

	const onLeftClick = () => {
		if (selectedId === 0) {
			onImageChange(images.length - 1);
		} else {
			onImageChange(selectedId - 1);
		}
	};

	const onRightClick = () => {
		if (selectedId === images.length - 1) {
			onImageChange(0);
		} else {
			onImageChange(selectedId + 1);
		}
	};

	return (
		<div className={s.photoBooth}>
			<div className={s.selectedImage}>
				<button
					onClick={onLeftClick}
					className={classNames(s.button, s.left)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="48px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="white"
					>
						<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
					</svg>
				</button>
				<ul className={s.carousel} ref={viewImageRef}>
					{images.map((image, index) => (
						<li key={image}>
							<img src={image} alt={`wedding-${index + 1}`} />
						</li>
					))}
				</ul>

				<button
					onClick={onRightClick}
					className={classNames(s.button, s.right)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="48px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="white"
					>
						<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
					</svg>
				</button>
			</div>
			<div className={s.photoList} ref={photoListRef}>
				{images.map((image, index) => (
					<div
						className={classNames(s.photo, {
							[s.selected]: selectedId === index,
						})}
						key={image}
						onClick={() => onImageChange(index)}
						ref={(el) => {
							imageRefs.current[index] = el;
						}}
					>
						<img src={image} alt={`wedding-${index + 1}`} />
					</div>
				))}
			</div>
		</div>
	);
};
