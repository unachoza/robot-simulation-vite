import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import robot_s from "./assets/robot_images/robot_s.png";
import robot_nw from "./assets/robot_images/robot_nw.png";
import robot_se from "./assets/robot_images/robot_se.png";

describe("App Component", () => {
	test("renders the heading correctly", () => {
		render(<App />);
		expect(screen.getByRole("heading", { name: /Toy Robot Simulation/i })).toBeInTheDocument();
	});

	test("renders the Table component", () => {
		render(<App />);
		expect(screen.getByTestId("table")).toBeInTheDocument();
	});

	test("renders the Robot component", () => {
		render(<App />);
		expect(screen.getByAltText("toy robot")).toBeInTheDocument();
	});

	test("opens modal when Instructions button is clicked", () => {
		render(<App />);
		fireEvent.click(screen.getByRole("button", { name: /Instructions/i }));
		expect(screen.getByTestId("modal")).toBeInTheDocument();
	});

	test("changes robot direction on Left button click", () => {
		render(<App />);
		const leftButton = screen.getByText("Left");
		const robotImage = screen.getByAltText("toy robot");
		expect(robotImage).toHaveAttribute("src", robot_s);
		fireEvent.click(leftButton);
		expect(robotImage).toHaveAttribute("src", robot_se);
	});

	test("changes robot direction on Right button click", () => {
		render(<App />);
		const rightButton = screen.getByText("Right");
		const robotImage = screen.getByAltText("toy robot");
		expect(robotImage).toHaveAttribute("src", robot_s);
		fireEvent.click(rightButton);
		expect(robotImage).toHaveAttribute("src", robot_nw);
	});
});
