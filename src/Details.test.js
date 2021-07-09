import React from "react";
import { useParams } from 'react-router-dom';
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import axios from "axios";
import Details from './Details';

const mockPokemonData = {
  data: {
    "abilities": [
      {
        "ability": {
          "name": "blaze",
          "url": "https://pokeapi.co/api/v2/ability/66/"
        },
        "is_hidden": false,
        "slot": 1
      },
      {
        "ability": {
          "name": "solar-power",
          "url": "https://pokeapi.co/api/v2/ability/94/"
        },
        "is_hidden": true,
        "slot": 3
      }
    ],
    "base_experience": 62,
    "id": 4,  
    "is_default": true,
    "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/4/encounters",
    "moves": [
      {
        "move": {
          "name": "mega-punch",
        },
      },
      {
        "move": {
          "name": "fire-punch",
        },
      },
      {
        "move": {
          "name": "thunder-punch",
        },
      },
      {
        "move": {
          "name": "scratch",
        },
      },
      {
        "move": {
          "name": "swords-dance",
        },
      },
      {
        "move": {
          "name": "cut",
        },
      },
      {
        "move": {
          "name": "mega-kick",
        },
      },
      {
        "move": {
          "name": "headbutt",
        },
      },
    ],
    "name": "charmander",
    "sprites": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    "stats": [
      {
        "base_stat": 39,
        "stat": {
          "name": "hp",
        }
      },
      {
        "base_stat": 52,
        "stat": {
          "name": "attack",
        }
      },
      {
        "base_stat": 43,
        "stat": {
          "name": "defense",
        }
      },
    ],
    "types": [
      {
        "type": {
          "name": "fire",
        }
      }
    ],
    "weight": 85
  }
};

jest.mock('axios');
/*
  MOCKING 'useParams' FUNCTION
*/
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

beforeEach(() => {
  /*
      MOCKING URL PARAM FOR POKEMON ID/NAME
  */
  useParams.mockReturnValue({ id: 4 });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Test Pokemon Details:', () => {
  let wrapper;

  test('render loading message:', () => {
    wrapper = shallow(<Details />);
    expect(wrapper.text()).toBe('Searching Pokemon Details...');
  });

  test('render pokemon details:', async () => {
    window.localStorage.favPokes = '[]';

    await act(async () => {
      await axios.get.mockImplementationOnce(() => Promise.resolve(mockPokemonData));
      wrapper = mount(<Details />);
    });

    wrapper.update();

    await expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/4');
    await expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(wrapper.find('img').props().src).toEqual(mockPokemonData.data.sprites.front_default);
    /*
      TODO: VERIFY PRINTED DATA SAMPLE (INSIDE THE BOXES)
    */
  });
});