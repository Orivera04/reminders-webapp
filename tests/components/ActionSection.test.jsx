import { fireEvent, render } from "@testing-library/react";
import { ActionSection } from "../../src/components";

describe('ActionSection', () => {
  it('calls onUpdate and onDelete with correct id when buttons are clicked', () => {
    const id = 1;
    const mockOnUpdate = jest.fn();
    const mockOnDelete = jest.fn();

    const { getByTestId } = render(
      <ActionSection id={id} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
    );

    fireEvent.click(getByTestId(`update-button`));
    expect(mockOnUpdate).toHaveBeenCalledWith(id);

    fireEvent.click(getByTestId(`delete-button`));
    expect(mockOnDelete).toHaveBeenCalledWith(id);
  });
});
