import React, { useState, useEffect } from 'react';

/*
    'AXIOS' WILL MAKE THE REQUESTS MORE EASY TO HANDLE, ESPECIALLY IN THE FAVORITES PAGE
*/
import axios from 'axios';

import PokemonList from './components/PokemonList';

export default function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    /*
        THE BASIC URL SHOULD (IF POSSIBLE) BE STORED IN A ENVIRONMENT VARIABLE,
        IT CAN AVOID SOME 'MISTAKES'
    */
    const [currentURL, setCurrentURL] = useState('https://pokeapi.co/api/v2/pokemon/?limit=30');
    const [nextURL, setNextURL] = useState();
    const [prevURL, setPrevURL] = useState();
    const [loadingContent, setLoadingContent] = useState(true);
    const axiosData = async (tokenToCancel) => {
        return axios.get(currentURL, {
            callToken: new axios.CancelToken( (c) => {tokenToCancel = c} )
        })
    }

    useEffect(() => {
        setLoadingContent(true);
        let tokenToCancel;

        /*
            THE 'CANCELTOKEN' IS USED TO BLOCK SIMULTANEOUS REQUESTS
        */
        axiosData(tokenToCancel).then(res => {
            setNextURL(res.data.next);
            setPrevURL(res.data.previous);
            setPokemonList(res.data.results);
            setLoadingContent(false);
        });

        return () => {
            tokenToCancel();
        }
    }, [currentURL]);

    /*
        PAGINATION FUNCTIONS
    */
    function loadNextPage() {
        setCurrentURL(nextURL);
    }

    function loadPrevPage() {
        setCurrentURL(prevURL);
    }

    /*
        ALL PAGES HAVE THIS 'LOADING MESSAGES' TO SHOW USERS A STATUS,
        BUT IT CAN BE HANDLED, AND MOUNTED, IN OTHER WAY
    */
    if(loadingContent) return 'Searching Pokemon...';

    return (
        <>
            <PokemonList
                pokemonList={pokemonList}
                loadNextPage={nextURL ? loadNextPage : null}
                loadPrevPage={prevURL ? loadPrevPage : null}
            />
        </>
    );
}
