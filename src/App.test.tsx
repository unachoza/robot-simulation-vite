// import { fireEvent, render, screen } from "@testing-library/react";
// import App from "./App";

// describe("App Component", () => {
// 	it("should have Toy Robot Similation text in app ", () => {
// 		render(<App />);
// 		const message = screen.queryByText(/Toy Robot Simulation/i);
// 		expect(message).toBeVisible();
// 	});

// 	test("changes robot direction on Left button click", () => {

// 	})

// 	test("changes robot direction on Right button click", () => {

// 	})

// 	test("moves robot one square in facing direction on Move button click", () => {
// 		render(<App />);

// 		// const robotImage = screen.getByRole("img");
// 		// console.log({ robotImage });
// 		// const moveButton = screen.getByText("Move");
// 		// console.log(robotImage.style);
// 		// fireEvent.click(moveButton);

// 		// console.log(robotImage.style);
// 		// // Assuming the initial position is (50, 10), it should change based on the move logic
// 		// expect(robotImage).toHaveStyle({ top: "10px", left: "50px" });
// 	});
// });

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { testData, CommandType } from "./utils/testData";

describe("core functionality", () => {
	const executeCommands = (commands: CommandType[]) => {
		commands.forEach(({ command, location, direction }) => {
			switch (command) {
				case "PLACE":
					if (location && direction) {
						// Mock the placement of the robot by setting its state directly
						fireEvent.click(screen.getByText("Place")); // Close modal if open
						fireEvent.click(screen.getByText("Move"));
					}
					break;
				case "MOVE":
					fireEvent.click(screen.getByText("Move"));
					break;
				case "LEFT":
					fireEvent.click(screen.getByText("Left"));
					break;
				case "RIGHT":
					fireEvent.click(screen.getByText("Right"));
					break;
				case "REPORT":
					fireEvent.click(screen.getByText("Report"));
					break;
				default:
					break;
			}
		});
	};

	testData.forEach(({ input, output }) => {
		test(`executes commands: ${input.map((cmd) => cmd.command).join(", ")} and results in position ${output.location} facing ${
			output.direction
		}`, () => {
			render(<App />);

			executeCommands(input);

			// Open modal to check report
			fireEvent.click(screen.getByText("Report"));

			// Check the modal content
			const modalContent = screen.getByText(
				`Robot is located at ${output.location[0]},${output.location[1]} and is facing ${output.direction}`
			);
			expect(modalContent).toBeInTheDocument();
		});
	});
});
