import s from "./bodyLayout.module.css";

interface Props {
	children: React.ReactNode;
}

export const BodyLayout = ({ children }: Props) => {
	return <div className={s.contents}>{children}</div>;
};
