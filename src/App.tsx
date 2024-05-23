import { useState } from "react";
import Table from "./components/Table/Table";
import { INITIAL_ROBOT_STATE } from "./utils/constants";
import { RobotState } from "./utils/types";
import "./App.css";

const App = () => {
	const [robotState, setRobotState] = useState<RobotState>(INITIAL_ROBOT_STATE);

	return (
		<>
			<h1>Toy Robot Simulation</h1>
			<div>
				<Table setRobotState={setRobotState} />
			</div>
		</>
	);
};

export default App;
