import React, {useState} from "react";

interface imageProps {
	keepAR: boolean;
	position: string;
	flipH: boolean;
	flipV: boolean;
	rotate: number;
}

const ImageUploader = (props: imageProps) => {
	const [image, setImage] = useState();

	const imageChange = (e: any) => {
		if (e.target.files && e.target.files.length > 0)
			setImage(e.target.files[0]);
	};

	return (
		<>
			<input accept="image/*" type="file" onChange={imageChange} />
			{image &&
			<img
				src={URL.createObjectURL(image)}
				className="w-100"
				style={{
					aspectRatio: 1,
					objectFit: (props.keepAR) ? "cover" : "fill",
					objectPosition: props.position,
					transform: `rotateX(${props.flipH ? 180 : 0}deg) rotateY(${props.flipV ? 180 : 0}deg) rotateZ(${props.rotate ?? 0}deg)`,
				}}
			/>
			}
		</>
	);
};

export default ImageUploader;
