import React from 'react'
import Pagination from './Pagination';

import '../scss/PokemonList.scss';

export default function Pokemon({ pokemonList, loadNextPage, loadPrevPage }) {
    return (
        <>
            <div>
                <Pagination
                    loadNextPage={loadNextPage}
                    loadPrevPage={loadPrevPage}
                    aditionalClass='pagination-buttons__top'
                />
            </div>

            <ul className="pokemon-list">
                {pokemonList.map( (poke) => {
                    let pokeNumber = poke.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
                    // let pokeImgURL = `/sprites/${pokeNumber}.png`;
                    let pokeDescription = `Imagem ilustrativa do pokemon ${poke.name}`
                    return (
                        <li key={pokeNumber} className="pokemon-list__item" data-pokemon-number={`#${pokeNumber}`}>
                            <a href={poke.name} className="pokemon-list__link">
                                <figure className="pokemon-list__figure">
                                    {/* <img src={pokeImgURL} alt={pokeDescription} width='80' className="pokemon-list__image"/> */}
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNumber}.png`} alt={pokeDescription} width='80' className="pokemon-list__image"/>
                                    <figcaption className="pokemon-list__caption">{poke.name.replace('-', ' ')}</figcaption>
                                </figure>
                            </a>
                        </li>
                    );
                })}
            </ul>

            <div>
                <Pagination
                    loadNextPage={loadNextPage}
                    loadPrevPage={loadPrevPage}
                    aditionalClass='pagination-buttons__bottom'
                />
            </div>
        </>
    )
}
