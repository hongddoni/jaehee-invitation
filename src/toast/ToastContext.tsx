import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";
import s from "./toast.module.css";
import { Toast } from "./Toast";

interface ToastContextType {
	showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
	children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
	const [toasts, setToasts] = useState<
		Array<{
			id: string;
			message: string;
			duration?: number;
		}>
	>([]);

	const showToast = useCallback(
		(message: string, duration?: number) => {
			const id = Math.random().toString(36).substr(2, 9);
			setToasts((prevToasts) => [
				...prevToasts,
				{ id, message, duration },
			]);
		},
		[]
	);

	const removeToast = useCallback((id: string) => {
		setToasts((prevToasts) =>
			prevToasts.filter((toast) => toast.id !== id)
		);
	}, []);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className={s.toastContainer}>
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						id={toast.id}
						message={toast.message}
						duration={toast.duration}
						onClose={removeToast}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};
