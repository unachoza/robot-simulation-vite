import { useState, useEffect, MouseEvent } from "react";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";
import Robot from "./components/Robot/Robot";
import Modal from "./components/Modal/Modal";
import useScreenSize from "./utils/useScreenSize";
import { INITIAL_ROBOT_STATE, INSTRUCTIONS, ROBOT_IMAGE_DIRECTIONS, TABLE_SIZE } from "./utils/constants";
import { Direction, RobotState } from "./utils/types";
import "./App.css";

const App = () => {
	const [robotState, setRobotState] = useState<RobotState>(INITIAL_ROBOT_STATE);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggling = () => setIsOpen(!isOpen);
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

	const getRobotDirectionImage = () => {
		console.log("called");
		return ROBOT_IMAGE_DIRECTIONS[robotState.direction];
	};

	const isValidMove = (x: number, y: number): boolean => {
		return x >= 0 && x < tableSize && y >= 0 && y < tableSize;
	};

	const handleMove = () => {
		if (robotState?.location) {
			let {
				location: { x, y },
				direction,
				top,
				left,
			} = robotState;
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
				setRobotState({
					...robotState,
					location: { x, y },
					left,
					top,
				});
			}
		}
	};

	const handleChangeDirections = (e: MouseEvent<HTMLElement>) => {
		if (robotState.location) {
			let directionIndex: number = directions.indexOf(robotState.direction);
			let directionChange = e.currentTarget.innerHTML.toLowerCase();
			if (directionChange === "left") {
				directionIndex = (directionIndex + 3) % 4;
			} else if (directionChange === "right") {
				directionIndex = (directionIndex + 1) % 4;
			}
			setRobotState((prevRobotState) => ({
				...prevRobotState,
				direction: directions[directionIndex] as Direction,
			}));
		}
	};

	const handleReport = () => {
		if (robotState?.location) {
			const {
				location: { x, y },
				direction,
			} = robotState;
			toggling();
			setModalText(`Robot is located at ${x},${y} and is facing ${direction.toUpperCase()}`);
		}
	};
	const showInstructions = () => {
		toggling();
		setModalText(INSTRUCTIONS);
	};

	return (
		<>
			<h1>Toy Robot Simulation</h1>
			<div className="app-container">
				<Table setRobotState={setRobotState} />
				<div>
					<Robot image={getRobotDirectionImage()} x={robotState.left} y={robotState.top} location={robotState.location || null} />
					<div className="buttons-container">
						<Button onClick={showInstructions} text="Instructions" />
						<Button onClick={handleMove} text="Move" />
						<Button onClick={(e) => handleChangeDirections(e)} text="Left" />
						<Button onClick={(e) => handleChangeDirections(e)} text="Right" />
						<Button onClick={handleReport} text="Report" />
					</div>
					{isOpen && <Modal toggling={toggling} content={modalText} />}
				</div>
			</div>
		</>
	);
};

export default App;
