import s from "./upperLayer.module.css";

interface Props {
	children: React.ReactNode;
}

export const UpperLayer = ({ children }: Props) => {
	return <div className={s.layer}>{children}</div>;
};
