import {
	useEffect,
	useRef,
	useState,
	isValidElement,
	cloneElement,
} from "react";
import type { ReactNode, ReactElement } from "react";
import s from "./animateText.module.css";
import classNames from "classnames";

interface Props {
	children: ReactNode;
	delay?: number;
	type?: "fadeUp" | "typewriter";
	className?: string;
}

export const AnimateText = (props: Props) => {
	const { children, delay = 0.05, type = "fadeUp", className } = props;
	const [isVisible, setIsVisible] = useState(false);
	const textRef = useRef<HTMLParagraphElement>(null);

	// ReactNode를 재귀적으로 탐색하여 애니메이션을 적용하는 함수
	const processNode = (
		node: ReactNode,
		currentIndex: { value: number }
	): ReactNode => {
		if (typeof node === "string") {
			// 문자열인 경우 각 문자마다 애니메이션 적용
			return Array.from(node).map((char, _index) => {
				const globalIndex = currentIndex.value;
				currentIndex.value++;

				return (
					<span
						className={`${s.chunk} ${isVisible ? s[type] : ""}`}
						key={`char-${globalIndex}`}
						style={{
							animationDelay: isVisible
								? `${globalIndex * delay}s`
								: "0s",
						}}
					>
						{char === " " ? "\u00A0" : char}
					</span>
				);
			});
		}

		if (typeof node === "number") {
			// 숫자인 경우 문자열로 변환하여 처리
			return processNode(node.toString(), currentIndex);
		}

		if (isValidElement(node)) {
			// React Element인 경우 children을 재귀적으로 처리
			const element = node as ReactElement<any>;
			const elementProps = element.props || {};
			const processedChildren = processChildren(
				elementProps.children,
				currentIndex
			);

			return cloneElement(element, {
				...(elementProps as object),
				key: `element-${currentIndex.value}`,
				children: processedChildren,
			});
		}

		if (Array.isArray(node)) {
			// 배열인 경우 각 요소를 재귀적으로 처리
			return node.map((child, _index) =>
				processNode(child, currentIndex)
			);
		}

		// 그 외의 경우 (null, undefined, boolean 등) 그대로 반환
		return node;
	};

	// children을 재귀적으로 처리하는 함수
	const processChildren = (
		children: ReactNode,
		currentIndex: { value: number }
	): ReactNode => {
		if (Array.isArray(children)) {
			return children.map((child, _index) =>
				processNode(child, currentIndex)
			);
		}
		return processNode(children, currentIndex);
	};

	// 전체 텍스트에서 문자 개수를 계산하는 함수
	const countTotalChars = (node: ReactNode): number => {
		if (typeof node === "string") {
			return node.length;
		}

		if (typeof node === "number") {
			return node.toString().length;
		}

		if (isValidElement(node)) {
			const element = node as ReactElement<any>;
			const elementProps = element.props || {};
			return countTotalChars(elementProps.children);
		}

		if (Array.isArray(node)) {
			return node.reduce(
				(total, child) => total + countTotalChars(child),
				0
			);
		}

		return 0;
	};

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

	// 애니메이션이 적용된 콘텐츠 생성
	const animatedContent = (() => {
		const indexCounter = { value: 0 };
		return processChildren(children, indexCounter);
	})();

	return (
		<p className={classNames(s.text, className)} ref={textRef}>
			{animatedContent}
		</p>
	);
};
