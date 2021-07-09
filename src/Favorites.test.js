import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import axios from "axios";
import Favorites from './Favorites';

jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Test Favorited Pokemon:', () => {
    let wrapper;

    test('render loading message:', () => {
        wrapper = shallow(<Favorites />);
        expect(wrapper.text()).toBe('Searching Favorited Pokemon...');
    });

    test('render empty favorited pokemon message:', async () => {
        window.localStorage.favPokes = '[]';

        await act(async () => {
            wrapper = mount(<Favorites />);
        });

        wrapper.update();

        await expect(wrapper.find('.favorite-list__no-pokemon').first().text()).toBe('No Favorited Pokemon. (yet!)');
    });

    test('render filled favorited pokemon list:', async () => {
        window.localStorage.favPokes = '[4]';

        await act(async () => {
            await axios.get.mockImplementationOnce(() => Promise.resolve({data: {name:'charmander',id:4}}));
            await axios.all.mockImplementationOnce(() => Promise.resolve({data: {name:'charmander',id:4}}));
            // await axios.spread.mockImplementationOnce(() => Promise.resolve({data: {name:'charmander',id:4}}));
            wrapper = mount(<Favorites />);
        });
    
        wrapper.update();
    
        await expect(wrapper.find('.favorite-list__no-pokemon').length).toBe(0);

        await expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/4');
        await expect(axios.get).toHaveBeenCalledTimes(1);
        await expect(axios.all).toHaveBeenCalledTimes(1);
        // await expect(wrapper.find('img').props().src).toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png');
        /*
            TODO: VERIFY WHY CONTENT DOESN'T RENDER AFTER axios.all -> axios.spread
        */
    });
});