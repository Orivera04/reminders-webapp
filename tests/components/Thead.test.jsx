import { render } from "@testing-library/react";
import { Thead } from "../../src/components";

describe('Thead', () => {

  const COLUMNS = ['Name', 'Email', 'Phone', 'Actions'];

  it('should render the Thead', () => {

    const { getByText } = render(
      <table>
        <Thead headers={ COLUMNS }/>
      </table>
    )

    const thead = document.querySelector('thead');
    expect(thead).toBeTruthy();

    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Phone')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });
});
