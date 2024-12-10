import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';


//Homepage renders static content, so unit tests would be simple in this case
//test if component behaves as expected in isolation & content displays correctly 
//use 'test()' for individual test cases
//test() is similar to it(), but it() is more BDD 
//use 'describe()' for grouping tests
//toBeInTheDocument- jest-dom (could use .toBeVisible().toHaveTextContent)
//render-> function from React Testing Library (renders react component and creates virtual DOM tree to interact for test)

describe('HomePage Component', () => {
  test('renders homepage with correct title', () => {
    const { getByText } = render(<HomePage />);

    // Check if the h1 text "Welcome: HomePage"  in the document
    expect(getByText('Welcome: HomePage')).toBeInTheDocument();
  });

});
