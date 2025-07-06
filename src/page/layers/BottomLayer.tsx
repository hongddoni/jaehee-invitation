import s from "./bottomLayer.module.css";
import headline from "../../assets/images/photo-13.webp";

interface Props {
	children?: React.ReactNode;
}

export const BottomLayer = ({ children }: Props) => {
	return (
		<div className={s.layer}>
			<div>
				<img src={headline} alt="headline" className={s.headline} />
			</div>
			{children}
		</div>
	);
};
