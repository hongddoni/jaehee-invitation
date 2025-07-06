import { useRef, useState } from "react";
import arrow from "../../assets/icons/arrowIcon.svg";
import s from "./accordian.module.css";
import classNames from "classnames";

interface AccordionProps {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}

export const Accordion = ({ title, subtitle, children }: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<div className={s.accordian}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className={s.button}
			>
				<div className={s.title}>
					<span className={s.titleText}>{title}</span>
					<span className={s.subtitleText}>{subtitle}</span>
				</div>
				<img
					src={arrow}
					className={classNames(s.arrow, isOpen && s.open)}
				/>
			</button>

			<div
				ref={contentRef}
				style={{
					height: isOpen ? contentRef.current?.scrollHeight : 0,
					overflow: "hidden",
					transition: "height 0.3s ease",
				}}
			>
				<div style={{ padding: "8px 12px" }}>{children}</div>
			</div>
		</div>
	);
};
