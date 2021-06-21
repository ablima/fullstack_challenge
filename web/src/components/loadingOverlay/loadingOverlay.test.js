import React from 'react';
import renderer from 'react-test-renderer';
import LoadingOverlay from './index';

test('Check if render is correct', () => {
  const component = renderer.create(
    <LoadingOverlay />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});