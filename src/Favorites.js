import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Favorites() {
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [hasFavorites, setHasFavorites] = useState(false);
    const [favoriteStoredList, setFavoriteStoredList] = useState('');
    const [favoritesData, setFavoritesData] = useState([])

    let requestsList = [];

    useEffect(() => {
        setLoadingFavorites(false);

        setFavoriteStoredList(JSON.parse(localStorage.favPokes));
    }, []);
        
    useEffect(() => {
        setLoadingFavorites(true);

        if(favoriteStoredList.length > 0) {
            setHasFavorites(true);
            retiviedFavoritedPokemonData(favoriteStoredList);
        }
    }, [favoriteStoredList]);

    function retiviedFavoritedPokemonData(data) {
        for(let i in data) {
            requestsList.push(
                axios.get(`https://pokeapi.co/api/v2/pokemon/${data[i]}`)
            )
        }

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
            {hasFavorites && favoritesData.map( (favorite, i) => (
                <p key={i}>
                    <img 
                        className="pokemon-card__image" 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${favorite.data.id}.png`} 
                    />
                    {favorite.data.name}
                </p>
            ))}
            {!hasFavorites && 
                <p>No Favorited Pokemon. (yet!)</p>
            }
        </>
    )
}
