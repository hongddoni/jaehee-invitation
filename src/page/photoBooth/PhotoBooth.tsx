import { useState } from "react";
import s from "./photoBooth.module.css";
import classNames from "classnames";

interface Props {
	images: string[];
}

export const PhotoBooth = ({ images }: Props) => {
	const [selectedId, setSelectedId] = useState<number>(0);

	const handleClick = (index: number) => {
		setSelectedId(index);
	};

	const onLeftClick = () => {
		if (selectedId === 0) {
			setSelectedId(images.length - 1);
		} else {
			setSelectedId(selectedId - 1);
		}
	};

	const onRightClick = () => {
		if (selectedId === images.length - 1) {
			setSelectedId(0);
		} else {
			setSelectedId(selectedId + 1);
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
				<img src={images[selectedId]} alt={`wedding-${selectedId}`} />
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
			<div className={s.photoList}>
				{images.map((image, index) => (
					<div
						className={classNames(s.photo, {
							[s.selected]: selectedId === index,
						})}
						key={image}
						onClick={() => handleClick(index)}
					>
						<img src={image} alt={`wedding-${index + 1}`} />
					</div>
				))}
			</div>
		</div>
	);
};
