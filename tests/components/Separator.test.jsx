import { render } from "@testing-library/react";
import { Separator } from "../../src/components";

describe('Separator', () => {

  test('renders separator with correct attributes and class', () => {
    const { container } = render(<Separator />);

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeTruthy()
  });

});
