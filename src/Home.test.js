import React from "react";
import { mount, shallow } from "enzyme";
import Home from './Home';
import PokemonList from './components/PokemonList';

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
    ]
}

let verifyMockPagination = (hasPagination) => {
    (hasPagination !== null) ? (true) : (false);
}

jest.mock('axios');

beforeEach(() => {
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Test Pokemon List:', () => {
    let wrapper;
  
    test('render loading message:', () => {
        wrapper = shallow(<Home />);
        expect(wrapper.text()).toBe('Searching Pokemon...');
    });

    test('render pokemon list:', () => {
        wrapper = mount(
            <PokemonList
                pokemonList={mockData.results}
                loadNextPage={verifyMockPagination(mockData.next)}
                loadPrevPage={verifyMockPagination(mockData.previous)}
            />
        );

        wrapper.update();

        expect(wrapper.find('.pokemon-list__item').length).toEqual(6);
        expect(wrapper.find('a').first().props().href).toEqual(mockData.results[0].name);
    });
  });