import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal Component", () => {
	const mockToggle = vi.fn();
	const shortContent = "This is a short content";
	const longContent = "This is a very long content".repeat(20);

	test("renders the modal container", () => {
		render(<Modal toggling={mockToggle} content={shortContent} />);
		const modalContainer = screen.getByTestId("modal");
		expect(modalContainer).toBeInTheDocument();
	});

	test("renders the close icon and triggers toggling when clicked", () => {
		render(<Modal toggling={mockToggle} content={shortContent} />);
		const closeIcon = screen.getByTestId("close-icon");
		expect(closeIcon).toBeInTheDocument();
		fireEvent.click(closeIcon);
		expect(mockToggle).toHaveBeenCalledTimes(1);
	});

	test("renders modal header when content length is less than 200", () => {
		render(<Modal toggling={mockToggle} content={shortContent} />);
		const modalHeader = screen.getByText("Report");
		expect(modalHeader).toBeInTheDocument();
	});

	test("does not render modal header when content length is 200 or more", () => {
		render(<Modal toggling={mockToggle} content={longContent} />);
		const modalHeader = screen.queryByText("Report");
		expect(modalHeader).not.toBeInTheDocument();
	});

	test("renders markdown content", () => {
		render(<Modal toggling={mockToggle} content={shortContent} />);
		const markdownContent = screen.getByText(shortContent);
		expect(markdownContent).toBeInTheDocument();
	});
});
