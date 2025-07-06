import { useWeddingImages } from "./hooks/useWeddingImages";
import { Information } from "./information/Information";
import { MapsButton } from "./mapsButton/MapsButton";
import { Ment } from "./ment/Ment";
import { PhotoBooth } from "./photoBooth/PhotoBooth";

export const MainPage = () => {
	const { images } = useWeddingImages();

	return (
		<>
			<Ment />
			<MapsButton />
			<Information />
			<PhotoBooth images={images} />
		</>
	);
};
