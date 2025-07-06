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

	return (
		<div className={s.photoBooth}>
			<div className={s.selectedImage}>
				<img src={images[selectedId]} alt={`wedding-${selectedId}`} />
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
