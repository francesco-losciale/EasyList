import React from 'react';
import App from '../src/App';
import {render, screen, userEvent, waitFor} from "@testing-library/react-native";
import {UserEventInstance} from "@testing-library/react-native/build/user-event/setup";

describe('App', () => {

  it('renders correctly', () => {
    render(<App/>);
  });

})


