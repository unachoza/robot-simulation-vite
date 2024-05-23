import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Robot from "./Robot";
import { Index } from "../../utils/types";

describe("Robot Component", () => {
	const mockImage = "mockImage.png";
	const x = 100;
	const y = 150;

	test("renders the robot image with the correct src", () => {
		render(<Robot image={mockImage} x={x} y={y} location={null} />);
		const robotElement = screen.getByAltText("toy robot");
		expect(robotElement).toBeInTheDocument();
		expect(robotElement).toHaveAttribute("src", mockImage);
	});

	test("positions the robot image correctly based on x and y props", () => {
		render(<Robot image={mockImage} x={x} y={y} location={null} />);
		const robotElement = screen.getByAltText("toy robot");
		expect(robotElement).toHaveStyle({ left: `${x}px`, top: `${y}px` });
	});

	test("sets the title attribute correctly when location is null", () => {
		render(<Robot image={mockImage} x={x} y={y} location={null} />);
		const robotElement = screen.getByAltText("toy robot");
		expect(robotElement).toHaveAttribute("title", "I'm a toy robot! Click a table square to place me on the table");
	});

	test("does not set the title attribute when location is not null", () => {
		render(<Robot image={mockImage} x={x} y={y} location={{ x: 0, y: 0 } as Index} />);
		const robotElement = screen.getByAltText("toy robot");
		expect(robotElement).not.toHaveAttribute("title");
	});
});
