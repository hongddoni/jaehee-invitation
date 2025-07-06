import s from "./linkButton.module.css";

interface Props {
	url: string;
	children: React.ReactNode;
	imageUrl: string;
	className?: string;
}

export const LinkButton = ({ url, children, imageUrl, className }: Props) => {
	return (
		<button
			className={`${s.button} ${className}`}
			onClick={() => window.open(url, "_blank")}
		>
			<div className={s.imageWrap}>
				<img src={imageUrl} alt="link" />
			</div>
			<span>{children}</span>
		</button>
	);
};
