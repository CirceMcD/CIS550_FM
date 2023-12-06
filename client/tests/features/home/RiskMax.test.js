import React from 'react';
import { shallow } from 'enzyme';
import { RiskMax } from '../../../src/features/home/RiskMax';

describe('home/RiskMax', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RiskMax {...props} />
    );

    expect(
      renderedComponent.find('.home-risk-max').length
    ).toBe(1);
  });
});
