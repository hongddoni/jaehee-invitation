import { useEffect, useRef, useState } from "react";
import s from "./animateText.module.css";
import classNames from "classnames";

interface Props {
	children: string;
	delay?: number;
	type?: "fadeUp" | "typewriter";
	className?: string;
}

export const AnimateText = (props: Props) => {
	const { children, delay = 0.05, type = "fadeUp", className } = props;
	const [isVisible, setIsVisible] = useState(false);
	const textRef = useRef<HTMLParagraphElement>(null);

	const arrText = Array.from(children);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect(); // 한 번만 실행되도록 연결 해제
				}
			},
			{
				threshold: 0.1, // 10% 보일 때 트리거
				rootMargin: "0px 0px -50px 0px", // 하단 여백 50px
			}
		);

		if (textRef.current) {
			observer.observe(textRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<p className={classNames(s.text, className)} ref={textRef}>
			{arrText.map((text, index) => (
				<span
					className={`${s.chunk} ${isVisible ? s[type] : ""}`}
					key={index}
					style={{
						animationDelay: isVisible ? `${index * delay}s` : "0s",
					}}
				>
					{text === " " ? "\u00A0" : text}
				</span>
			))}
		</p>
	);
};
