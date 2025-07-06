import s from "./information.module.css";
import Copy from "../../assets/icons/copy.svg";
import { CopyButton } from "../copyButton/CopyButton";
import { Accordion } from "../acordian/Accordian";

export const Information = () => {
	return (
		<div className={s.information}>
			<div className={s.title}>
				<span className={s.bold}>신랑</span> &{" "}
				<span className={s.bold}>신부</span>에게 마음 전하기
			</div>
			<div className={s.description}>
				소중한 마음을 담아 전달해 보세요.
			</div>
			<div className={s.accordians}>
				<Accordion title="신랑" subtitle="측 계좌번호">
					<div className={s.accordianContent}>
						<CopyButton link="11591059534707">
							<span>심정재 하나 115-910-595-34707</span>
							<img src={Copy} />
						</CopyButton>
						<CopyButton link="110225226780">
							<span>심창섭 신한 110-225-226780</span>
							<img src={Copy} />
						</CopyButton>
						<CopyButton link="1002982032288">
							<span>황희자 우리 1002-982-032288</span>
							<img src={Copy} />
						</CopyButton>
					</div>
				</Accordion>
				<Accordion title="신부" subtitle="측 계좌번호">
					<div className={s.accordianContent}>
						<CopyButton link="94130175864">
							<span>안재희 국민 94130175864</span>
							<img src={Copy} />
						</CopyButton>
						<CopyButton link="110034031185">
							<span>강은경 신한 110-034-031185</span>
							<img src={Copy} />
						</CopyButton>
					</div>
				</Accordion>
			</div>
		</div>
	);
};
