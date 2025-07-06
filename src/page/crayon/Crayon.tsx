import s from "./crayon.module.css";

export const Crayon = () => {
	return (
		<>
			<svg viewBox="0 0 300 300">
				<defs>
					<filter id="crayonNoise">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.8"
							numOctaves="2"
							result="noise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="noise"
							scale="2"
						/>
					</filter>
				</defs>

				<path
					d="M 5 5 L 290 5"
					stroke="red"
					stroke-width="2"
					fill="none"
					filter="url(#crayonNoise)"
					stroke-linecap="round"
				/>
			</svg>

			<svg
				className={s.crayon}
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="300"
				height="300"
			>
				<filter id="n" x="0" y="0">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.75"
						stitchTiles="stitch"
					/>
				</filter>

				<rect width="300" height="300" fill="#fff" />
				<rect
					width="300"
					height="300"
					filter="url(#n)"
					opacity="0.80"
				/>
			</svg>
		</>
	);
};
