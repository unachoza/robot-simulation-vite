import { useState } from "react";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";
import Robot from "./components/Robot/Robot";
import { INITIAL_ROBOT_STATE, ROBOT_IMAGE_DIRECTIONS } from "./utils/constants";
import { RobotState } from "./utils/types";
import "./App.css";

const App = () => {
	const [robotState, setRobotState] = useState<RobotState>(INITIAL_ROBOT_STATE);

	const getRobotDirectionImage = () => {
		return ROBOT_IMAGE_DIRECTIONS[robotState.direction];
	};

	return (
		<>
			<h1>Toy Robot Simulation</h1>
			<div className="app-container">
				<Table setRobotState={setRobotState} />
				<div>
					<Robot image={getRobotDirectionImage()} x={robotState.left} y={robotState.top} location={robotState.location || null} />
					<div className="buttons-container">
						<Button onClick={() => console.log("clicked")} text="Instructions" />
						<Button onClick={() => console.log("clicked")} text="Move" />
						<Button onClick={() => console.log("clicked")} text="Left" />
						<Button onClick={() => console.log("clicked")} text="Right" />
						<Button onClick={() => console.log("clicked")} text="Report" />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
