import { BottomLayer } from "../page/layers/BottomLayer";
import { UpperLayer } from "../page/layers/UpperLayer";
import { BodyLayout } from "./BodyLayout";
import s from "./mainLayout.module.css";

interface Props {
	children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
	return (
		<div className={s.layout}>
			<div>
				<BottomLayer />
				<UpperLayer>
					<BodyLayout>{children}</BodyLayout>
				</UpperLayer>
			</div>
		</div>
	);
};
