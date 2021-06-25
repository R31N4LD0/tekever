import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonList from './components/PokemonList';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentURL, setCurrentURL] = useState('https://pokeapi.co/api/v2/pokemon/?limit=30');
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    setLoadingContent(true);
    let tokenToCancel;

    axios.get(currentURL, {
      callToken: new axios.CancelToken( (c) => {tokenToCancel = c} )
    }).then(res => {
      setNextURL(res.data.next);
      setPrevURL(res.data.previous);
      setPokemonList(res.data.results);
      setLoadingContent(false);
    });

    /*
     * THIS FUNCTIONS IS CALLED EVERY TIME 'useeEffect' IS CALLED
     */
    return () => {
      // tokenToCancel.cancel();
      tokenToCancel();
    }
  }, [currentURL]);

  function loadNextPage() {
    setCurrentURL(nextURL);
  }

  function loadPrevPage() {
    setCurrentURL(prevURL);
  }

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
