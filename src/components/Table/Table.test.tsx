import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import { RobotState } from "../../utils/types";

describe("Table Component", () => {
	const mockSetRobotState = vi.fn();

	const initialRobotState: RobotState = {
		direction: "south",
		location: { x: 0, y: 0 },
		left: 50,
		top: 10,
	};

	test("renders the table component with correct number of squares", () => {
		render(<Table setRobotState={mockSetRobotState} />);
		const tableElement = screen.getByTestId("table");
		expect(tableElement).toBeInTheDocument();

		const rows = tableElement.querySelectorAll(".table-row");
		expect(rows.length).toBe(5);
		rows.forEach((row) => {
			const squares = row.querySelectorAll(".square");
			expect(squares.length).toBe(5);
		});
	});

	test("triggers getSquareLocationOnBrowswer function when square is clicked", () => {
		render(<Table setRobotState={mockSetRobotState} />);
		const tableElement = screen.getByTestId("table");
		const square = tableElement.querySelectorAll(".square")[0];
		const { x, y } = square.getBoundingClientRect();

		fireEvent.click(square);

		expect(mockSetRobotState).toHaveBeenCalledWith({
			...initialRobotState,
			direction: "north",
			location: { x: 0, y: 4 },
			left: x,
			top: y,
		});
	});

	test("The origin (0,0) is at the SOUTH WEST corner of the table (bottom left)", () => {
		render(<Table setRobotState={mockSetRobotState} />);
		const tableElement = screen.getByTestId("table");
		const originSquare = screen.getByTestId("square +0,0");

		expect(originSquare).toBeInTheDocument();

		const tableRows = tableElement.querySelectorAll(".table-row");
		const firstRow = tableRows[0];
		const firstRowSquares = firstRow.querySelectorAll(".square");
		expect(firstRowSquares[firstRowSquares.length - 1]).toBe(originSquare);
	});
});
