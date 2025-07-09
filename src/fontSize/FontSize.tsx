import { useEffect, useState } from "react";
import PlusIcon from "../assets/icons/plus_icon.svg";
import s from "./fontSize.module.css";

export const FontSize = () => {
	const [fontSize, setFontSize] = useState(10);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const html = document.querySelector("html");
		if (html) {
			html.style.fontSize = "10px";
		}
	}, []);

	const handleFontSizeUp = () => {
		setFontSize(fontSize + 1);

		const html = document.querySelector("html");
		if (html) {
			html.style.fontSize = `${fontSize}px`;
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!visible) return null;

	return (
		<button className={s.fontSize} onClick={handleFontSizeUp}>
			<img src={PlusIcon} alt="plus" />
		</button>
	);
};
