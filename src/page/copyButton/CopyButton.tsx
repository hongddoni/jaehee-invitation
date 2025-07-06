import s from "./copyButton.module.css";
import { debounce } from "../../utils/debounce";
import { useToast } from "../../toast/ToastContext";

interface Props {
	link: string;
	children: React.ReactNode;
}

export const CopyButton = ({ link, children }: Props) => {
	const { showToast } = useToast();

	const copyToClipboard = async (text: string) => {
		try {
			// 모던 브라우저에서 Clipboard API 사용
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(text);
				return true;
			} else {
				// 모바일이나 구형 브라우저를 위한 fallback
				const textArea = document.createElement("textarea");
				textArea.value = text;
				textArea.style.position = "fixed";
				textArea.style.left = "-999999px";
				textArea.style.top = "-999999px";
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();

				const result = document.execCommand("copy");
				document.body.removeChild(textArea);

				if (result) {
					return true;
				} else {
					throw new Error("복사 실패");
				}
			}
		} catch (error) {
			console.error("복사 실패:", error);
			return false;
		}
	};

	const handleCopy = debounce(async () => {
		const success = await copyToClipboard(link);
		if (success) {
			showToast("복사 되었습니다");
		} else {
			showToast("복사에 실패했습니다");
		}
	}, 300);

	return (
		<button className={s.button} onClick={handleCopy}>
			{children}
		</button>
	);
};
