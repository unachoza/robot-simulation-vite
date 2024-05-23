import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Component", () => {
	test("renders the button with the correct text", () => {
		render(<Button text="Click Me" onClick={() => {}} />);
		const buttonElement = screen.getByRole("button");
		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toHaveTextContent("Click Me");
	});

	test("triggers onClick handler when clicked", () => {
		const handleClick = vi.fn();
		render(<Button text="Click Me" onClick={handleClick} />);
		const buttonElement = screen.getByRole("button");
		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("on mouse hover shows hover css behavior", () => {
		render(<Button text="Click Me" onClick={() => {}} />);
		const buttonElement = screen.getByRole("button");
		fireEvent.mouseOver(buttonElement);
		expect(buttonElement).toHaveStyle({ border: "solid #41cef5aa" });
	});
});
