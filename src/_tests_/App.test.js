import { render, screen } from '@testing-library/react';

import App from '../App';
import { mockAppProps } from '../__mocks__/mockAppProps';

describe('<App />', () => {
  it('should show correct layout', () => {
    render(<App {...mockAppProps} />);

    screen.getByText(/checked/i);
  });

  it('should show correct layout when settings are not provided', () => {
    const propsWithoutSettings = mockAppProps;
    delete propsWithoutSettings.isExampleCheckboxChecked;

    render(<App {...propsWithoutSettings} />);

    screen.getByText(/unchecked/i);
  });
});
