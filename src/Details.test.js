import React from 'react';
import {
    render,
    unmountComponentAtNode
} from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useParams } from "react-router-dom";

import Details from './Details';

let container = null;

/*
    MOCKING 'useParams' FUNCTION
*/
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}));

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    /*
        MOCKING URL PARAM FOR POKEMON ID/NAME
    */
    useParams.mockReturnValue({ id: 4 });
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('render loading details message:', () => {
    act(() => {
        render(<Details/>, container);
    });
    
    expect(container.textContent).toBe('Searching Pokemon Details...');
});
