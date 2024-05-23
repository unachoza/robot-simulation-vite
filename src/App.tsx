import { useState } from "react";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";
import { INITIAL_ROBOT_STATE } from "./utils/constants";
import { RobotState } from "./utils/types";
import "./App.css";

const App = () => {
	const [robotState, setRobotState] = useState<RobotState>(INITIAL_ROBOT_STATE);

	return (
		<>
			<h1>Toy Robot Simulation</h1>
			<div className="app-container">
				<Table setRobotState={setRobotState} />
				<div>
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
