import { useRef, useEffect } from "react";
import { Portal } from "../../overlay/Portal";
import s from "./modal.module.css";
import classNames from "classnames";
import CloseIcon from "../../assets/icons/close_icon.svg";

interface Props {
	opened: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

export const Modal = (props: Props) => {
	const { opened = true, onClose, children, className } = props;
	const modalRef = useRef<HTMLDivElement>(null);

	// 모달이 열릴 때 body 스크롤 막기
	useEffect(() => {
		if (opened) {
			document.body.classList.add("modal-open");
		} else {
			document.body.classList.remove("modal-open");
		}

		return () => {
			document.body.classList.remove("modal-open");
		};
	}, [opened]);

	// ESC 키로 닫기
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (opened) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [opened, onClose]);

	if (!opened) return null;

	return (
		<Portal>
			<div className={s.overlay}>
				<div ref={modalRef} className={classNames(s.modal, className)}>
					<div className={s.header}>
						<button onClick={onClose}>
							<img src={CloseIcon} alt="close" />
						</button>
					</div>
					<div className={s.content}>{children}</div>
				</div>
			</div>
		</Portal>
	);
};
