import { render } from '@testing-library/react';

import WebDataAccessPredictionForebet from './web-data-access-prediction-forebet';

describe('WebDataAccessPredictionForebet', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebDataAccessPredictionForebet />);
    expect(baseElement).toBeTruthy();
  });
});
