import { render } from "@testing-library/react";
import { Loader } from "../../src/components/Loader";

describe('Loader', () => {

  it('should render the Loader', () => {

    const { getByTestId } = render(<Loader />);
    const loader = getByTestId('three-dots-loading');

    expect(loader).toBeTruthy();
  });
});
