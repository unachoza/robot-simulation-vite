import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
	it("should have Toy Robot Similation text in app ", () => {
		render(<App />);
		const message = screen.queryByText(/Toy Robot Simulation/i);
		expect(message).toBeVisible();
	});
});
