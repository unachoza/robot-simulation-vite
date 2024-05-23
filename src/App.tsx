import { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";
import Robot from "./components/Robot/Robot";
import Modal from "./components/Modal/Modal";
import useScreenSize from "./utils/useScreenSize";
import { INITIAL_ROBOT_STATE, INSTRUCTIONS, ROBOT_IMAGE_DIRECTIONS } from "./utils/constants";
import { Direction, RobotState } from "./utils/types";
import "./App.css";

const App = () => {
	const [robotState, setRobotState] = useState<RobotState>(INITIAL_ROBOT_STATE);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [modalText, setModalText] = useState<string>("");
	const { screenSize, handleResize } = useScreenSize(setRobotState);
	const [squarePxSize, setSquarePxSize] = useState<number>(120);

	const directions: Direction[] = ["north", "east", "south", "west"];
	const tableSize: number = 5;

	useEffect(() => {
		handleResize();
		switch (screenSize) {
			case "L":
				setSquarePxSize(120);
				break;
			case "M":
				setSquarePxSize(90);
				break;
			case "S":
				setSquarePxSize(70);
				break;
		}
	}, [screenSize]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowLeft":
					robotState.location && handleLeft();
					break;
				case "ArrowRight":
					robotState.location && handleRight();
					break;
				case "ArrowUp":
					robotState.location && handleMove();
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [handleMove, handleLeft, handleRight]);

	const getNewDirection = (currentDirection: Direction, turn: "left" | "right"): Direction => {
		let index = directions.indexOf(currentDirection);
		index = turn === "left" ? (index + 3) % 4 : (index + 1) % 4;
		return directions[index];
	};

	const isValidMove = (x: number, y: number): boolean => x >= 0 && x < tableSize && y >= 0 && y < tableSize;

	function handleMove() {
		if (robotState?.location) {
			let { x, y } = robotState.location;
			let { direction, top, left } = robotState;
			switch (direction) {
				case "north":
					y += 1;
					top -= squarePxSize;
					break;
				case "south":
					y -= 1;
					top += squarePxSize;
					break;
				case "east":
					x += 1;
					left += squarePxSize;
					break;
				case "west":
					x -= 1;
					left -= squarePxSize;
					break;
			}
			if (isValidMove(x, y)) {
				setRobotState({ ...robotState, location: { x, y }, left, top });
			}
		}
	}

	function handleLeft() {
		setRobotState({ ...robotState, direction: getNewDirection(robotState.direction, "left") });
	}

	function handleRight() {
		setRobotState({ ...robotState, direction: getNewDirection(robotState.direction, "right") });
	}
	const handleReport = () => {
		if (robotState?.location) {
			const { x, y } = robotState.location;
			const { direction } = robotState;
			toggling();
			setModalText(`Robot is located at ${x},${y} and is facing ${direction.toUpperCase()}`);
		}
	};

	const showInstructions = () => {
		toggling();
		setModalText(INSTRUCTIONS);
	};

	const toggling = () => setIsOpen(!isOpen);

	return (
		<>
			<h1>Toy Robot Simulation</h1>
			<div className="app-container">
				<Table setRobotState={setRobotState} />
				<div>
					<Robot
						image={ROBOT_IMAGE_DIRECTIONS[robotState.direction]}
						x={robotState.left}
						y={robotState.top}
						location={robotState.location || null}
					/>
					<div className="buttons-container">
						<Button onClick={showInstructions} text="Instructions" />
						<Button onClick={handleMove} text="Move" />
						<Button onClick={handleLeft} text="Left" />
						<Button onClick={handleRight} text="Right" />
						<Button onClick={handleReport} text="Report" />
					</div>
					{isOpen && <Modal toggling={toggling} content={modalText} />}
				</div>
			</div>
		</>
	);
};

export default App;
