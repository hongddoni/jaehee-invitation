import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: React.ReactNode }) => {
	const portalRoot = document.getElementById("overlay");
	return portalRoot ? createPortal(children, portalRoot) : null;
};
