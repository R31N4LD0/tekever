import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Home from './Home';
import PokemonList from './components/PokemonList';

let container = null;
/*
    SMALL DATA SAMPLE COPIED FROM ORIGINAL REQUEST 'https://pokeapi.co/api/v2/pokemon/'
    IT COULD BE EXTRACT TO A 'MOCK FOLDER' AND IMPORTED IN HERE
*/
let mockData = {
    "count":1118,
    "next":"https://pokeapi.co/api/v2/pokemon/?offset=30&limit=30",
    "previous":null,
    "results":[
        {
            "name":"bulbasaur",
            "url":"https://pokeapi.co/api/v2/pokemon/1/"},
        {
            "name":"ivysaur",
            "url":"https://pokeapi.co/api/v2/pokemon/2/"},
        {
            "name":"venusaur",
            "url":"https://pokeapi.co/api/v2/pokemon/3/"},
        {
            "name":"charmander",
            "url":"https://pokeapi.co/api/v2/pokemon/4/"},
        {
            "name":"charmeleon",
            "url":"https://pokeapi.co/api/v2/pokemon/5/"},
        {
            "name":"charizard",
            "url":"https://pokeapi.co/api/v2/pokemon/6/"},
    ]}

let verifyMockPagination = (hasPagination) => {
    (hasPagination !== null) ? (true) : (false);
}

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('render loading message:', () => {
    act(() => {
        render(<Home/>, container);
    });
    expect(container.textContent).toBe('Searching Pokemon...');
});

it('render pokemon list and pagination blocks:', async () => {
    await act(async () => {
        render(
            <PokemonList
                pokemonList={mockData.results}
                loadNextPage={verifyMockPagination(mockData.next)}
                loadPrevPage={verifyMockPagination(mockData.previous)}
            />,
            container
        )
    });
    expect(container.querySelectorAll('.pagination-buttons').length).toEqual(2);
    expect(
        container.querySelector('.pokemon-list').firstChild.textContent
    ).toBe(mockData.results[0].name);
})
