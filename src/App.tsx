import { MainLayout } from "./layout/MainLayout";
import { MainPage } from "./page/MainPage";
import { ToastProvider } from "./toast/ToastContext";

function App() {
	return (
		<MainLayout>
			<ToastProvider>
				<MainPage />
			</ToastProvider>
		</MainLayout>
	);
}

export default App;
