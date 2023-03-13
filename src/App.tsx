import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Container, Row, Col, Card, Form} from "react-bootstrap";
import { CaretUpFill, CaretDownFill, CaretLeftFill, CaretRightFill, Dot, ArrowClockwise, ArrowCounterclockwise, SymmetryHorizontal, SymmetryVertical } from "react-bootstrap-icons";
import ImageUploader from "./components/image-uploader";

function App() {
	const cropOptions = [
		[{value: "top", icon: <CaretUpFill />}],
		[{value: "left", icon: <CaretLeftFill />}, {value: "center", icon: <Dot />}, {value: "right", icon: <CaretRightFill />}],
		[{value: "bottom", icon: <CaretDownFill />}]
	];

	const [keepAR, setKeepAR] = useState(true);
	const [cropOption, setCropOption] = useState("center");
	const [rotate, setRotate] = useState(0);
	const [flipH, setFlipH] = useState(false);
	const [flipV, setFlipV] = useState(false);

	const [phraseText, setPhraseText] = useState("");
	const [phraseColor, setPhraseColor] = useState("black");

	const handleRotation = (amount: number) => {
		let newRotate: number = (rotate + amount) % 360;

		if (newRotate < 0)
			newRotate = 360 + newRotate;

		setRotate(newRotate);
	};

	return (
		<Container>
			<Row>
				<Col md={6}>
					<Card className="mb-4">
						<Card.Body>
							<h3>Imagen</h3>
							<Form>
								<Form.Group className="mb-3">
									<Form.Check type="switch" label="Keep aspect ratio" checked={keepAR} onChange={e => setKeepAR(e.target.checked)} />
								</Form.Group>

								{keepAR && 
								<Form.Group className="mb-3">
									{cropOptions.map((row, rowIdx) =>
										<Row key={`row-${rowIdx}`}>
											<Col align="center">
												{row.map((option, idx) => (
													<Button
														key={option.value}
														id={option.value}
														active={option.value === cropOption}
														onClick={() => setCropOption(option.value)}
													>
														{option.icon}
													</Button>
												))}
											</Col>
										</Row>
									)}
								</Form.Group>}

								<Form.Group>
									<Button onClick={() => handleRotation(-90)}><ArrowCounterclockwise /></Button>
									<Button onClick={() => handleRotation(90)}><ArrowClockwise /></Button>
								</Form.Group>

								<Form.Group>
									<Button active={flipH} onClick={() => setFlipH(!flipH)}><SymmetryHorizontal /></Button>
									<Button active={flipV} onClick={() => setFlipV(!flipV)}><SymmetryVertical /></Button>
								</Form.Group>
							</Form>
						</Card.Body>
					</Card>

					<Card>
						<Card.Body>
							<h3 className="mb-3">Frase</h3>
							<Form>
								<Form.Group className="mb-3">
									<Form.Control placeholder="Texto" onChange={e => setPhraseText(e.target.value)}></Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Control type="color" className="w-100" onChange={e => setPhraseColor(e.target.value)}></Form.Control>
								</Form.Group>
							</Form>
						</Card.Body>
					</Card>
				</Col>

				<Col md={6}>
					<Card>
						<Card.Body>
							<span style={{color: phraseColor}}>{ phraseText }</span>
							<br />
							<ImageUploader keepAR={keepAR} position={cropOption} rotate={rotate} flipH={flipH} flipV={flipV} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
