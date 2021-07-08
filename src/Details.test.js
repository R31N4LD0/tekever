import React from 'react';
import axios from 'axios';
import { waitFor } from '@testing-library/dom';
import { useParams } from "react-router-dom";
// import { render } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Details from './Details';

// jest.mock('axios');
/*
    MOCKING 'useParams' FUNCTION
*/
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}));

const mockPokemonData = {
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
  };

let container = null;

beforeEach(() => {
    jest.clearAllMocks();

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

// it('render loading details message:', async () => {
//     jest.spyOn(axios, 'get').mockResolvedValue({
//         data: mockPokemonData
//     })

//     const rendered = render(<Details/>, container);

//     await waitFor(() => expect(rendered.queryAllByText('Searching')).toHaveLength(1));
// });

/*
    * VERIFY DIFFERENCES BETWEEN LINES 5 AND 6
    * PROBLEM WITH 2 jest.mock
    * ERROR WHEN TRY PASS THROUGH LINE 71 (JSON.parse(localStorage.favPokes);)
      PROBABLY A MOCK VALUE CAN SOLVE
    * 
*/