import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ListGroup } from 'react-bootstrap';

import './Favorites.scss';

export default function Favorites() {
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [hasFavorites, setHasFavorites] = useState(false);
    const [favoriteStoredList, setFavoriteStoredList] = useState('');
    const [favoritesData, setFavoritesData] = useState([])

    let requestsList = [];

    useEffect(() => {
        if(localStorage.favPokes)
            setFavoriteStoredList(JSON.parse(localStorage.favPokes));

        setLoadingFavorites(false);
    }, []);
        
    useEffect(() => {
        if(favoriteStoredList.length > 0) {
            setHasFavorites(true);
            retiviedFavoritedPokemonData(favoriteStoredList);
        }
    }, [favoriteStoredList]);

    function retiviedFavoritedPokemonData(data) {
        for(let i in data) {
            /*
                CREATE A ARRAY OF REQUESTS
            */
            requestsList.push(
                axios.get(`https://pokeapi.co/api/v2/pokemon/${data[i]}`)
            )
        }

        /*
            GET EVERY RESPONSE FROM THE REQUEST ARRAY
        */
        axios.all(requestsList)
            .then(
                axios.spread(
                    (...responses) => {
                        setFavoritesData(responses);
                    }
                )
            )
            .then(
                setLoadingFavorites(false)
            )
            .catch(err => {
                console.error(err);
            });
    }

    if(loadingFavorites) return 'Searching Pokemon Favorited...';

    return (
        <>
            <ListGroup 
                className="favorite-list__pokemon"
                as="ul"
            >
                <ListGroup.Item 
                    className="favorite-list__title"
                    as="li"
                    variant="dark"
                >
                    Your favorited list
                </ListGroup.Item>

                {hasFavorites && favoritesData.map( (favorite, i) => (
                    <ListGroup.Item 
                        key={i}
                        className="favorite-list__pokemon"
                        as="li"
                    >
                        <img 
                            className="pokemon-card__image" 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${favorite.data.id}.png`} 
                            alt={`Imagem ilustrativa do pokemon ${favorite.data.name.replace('-', ' ')}`}
                        />
                        {favorite.data.name.replace('-', ' ')}
                    </ListGroup.Item>
                ))}

                {!hasFavorites && 
                    <ListGroup.Item 
                        className="favorite-list__no-pokemon"
                        as="li"
                    >
                        No Favorited Pokemon. (yet!)
                    </ListGroup.Item>
                }
            </ListGroup>
        </>
    )
}
