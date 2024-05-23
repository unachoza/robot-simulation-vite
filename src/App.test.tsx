import { render, screen } from "@testing-library/react";
import App from "./App";

it("should have basic text in app ", () => {
	render(<App />);
	const message = screen.queryByText(/click/i);
	expect(message).toBeVisible();
});
