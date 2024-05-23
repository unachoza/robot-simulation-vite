import { Dispatch, MouseEvent, SetStateAction } from "react";
import "./Table.css";
import { RobotState } from "../../utils/types";
import { TABLE_SIZE } from "../../utils/constants";

interface TableProps {
	setRobotState: Dispatch<SetStateAction<RobotState>>;
}

const Table = ({ setRobotState }: TableProps): JSX.Element => {
	const getSquareLocationOnBrowswer = (e: MouseEvent, xPosition: number, yPosition: number) => {
		const { x, y } = e.currentTarget.getBoundingClientRect();
		setRobotState({ direction: "north", location: { x: xPosition, y: yPosition }, left: x, top: y });
	};

	const createBoard = (rows: number, columns: number) => {
		let array2D = [];
		for (let i = 0; i < rows; i++) {
			let tableRow = [];
			for (let j = 0; j < columns; j++) {
				let index = [i, j];
				tableRow.unshift(
					<div
						key={`square +${index}`}
						data-testid={`square +${index}`}
						className="square"
						onClick={(e: MouseEvent) => getSquareLocationOnBrowswer(e, i, j)}
					>
						{index.toString()}
					</div>
				);
			}
			array2D.push(
				<div key={i} className="table-row">
					{tableRow}
				</div>
			);
		}
		return array2D;
	};

	return (
		<div className="table" data-testid="table">
			{createBoard(TABLE_SIZE, TABLE_SIZE)}
		</div>
	);
};

export default Table;
