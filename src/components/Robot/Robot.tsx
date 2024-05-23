import "./Robot.css";
import { Index } from "../../utils/types";

interface RobotProps {
	image: string;
	x: number;
	y: number;
	location: Index | null;
}

const Robot = ({ image, x, y, location }: RobotProps) => {
	return (
		<img
			src={image}
			className="robot"
			alt="toy robot"
			title={!location ? "I'm a toy robot! Click a table square to place me on the table" : undefined}
			style={{
				position: location ? "absolute" : "relative",
				left: `${x}px`,
				top: `${y}px`,
			}}
		/>
	);
};

export default Robot;
