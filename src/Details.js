import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from "react-router-dom";

import { Button, Card, Col, ListGroup, ListGroupItem, Row, } from 'react-bootstrap';

import './Details.scss';

export default function Details() {
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonId, setPokemonId] = useState('');
    const [pokemonImage, setPokemonImage] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [pokemonStats, setPokemonStats] = useState([]);
    const [pokemonBaseXP, setPokemonBaseXP] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonMoves, setPokemonMoves] = useState([]);
    const [pokemonTotalMoves, setPokemonTotalMoves] = useState('');

    const { id } = useParams();
    const pokeDetailsURL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const baseStats = ['hp', 'attack', 'defense']


    useEffect(() => {
        setLoadingDetails(true);
    
        axios.get(pokeDetailsURL)
            .then(res => {
                const fullData = res.data;
                console.log(fullData);
                
                setPokemonName(fullData.name);
                setPokemonId(fullData.id);
                setPokemonImage(fullData.sprites.front_default);
                setPokemonWeight(fullData.weight);
                setPokemonAbilities(
                    fullData.abilities.map( ability => ability.ability.name )
                );
                setPokemonStats(fullData.stats.map( status => {
                    if(baseStats.includes(status.stat.name)) {
                        return {
                            'name': status.stat.name,
                            'stat': status.base_stat
                        }
                    }
                }).filter(item => item != null));
                setPokemonBaseXP(fullData.base_experience)
                setPokemonTypes(fullData.types.map(type => type.type.name));
                setPokemonTotalMoves(fullData.moves.length)
                setPokemonMoves(fullData.moves.map((move, i) => {
                        if(i < 5) {
                            return move.move.name
                        }
                    }).filter(item => item != null)
                );

                checkIfPokemonIsFavorite(pokemonId)

                setLoadingDetails(false);
            });
    }, []);
    
    function checkIfPokemonIsFavorite(id) {
        let storageList = JSON.parse(localStorage.favPokes);
        setIsFavorite(storageList.includes(id));
        
        return isFavorite;
    }
    
    function toggleFavorite(id) {
        let storageList = JSON.parse(localStorage.favPokes);

        if(checkIfPokemonIsFavorite(id)) {
            localStorage.favPokes = JSON.stringify(storageList.filter(poke => poke !== id));
        } else if(!storageList.includes(id)) {
            storageList.push(id)
            localStorage.favPokes = JSON.stringify(storageList)
        }

        setIsFavorite(!isFavorite);
    }

    if(loadingDetails) return 'Searching Pokemon Details...';

    return (
        <>
            <Row xs="1" sm="2">
                <Col>
                    <Card className="text-center pokemon-card">
                        <Card.Header>Basic Infos</Card.Header>
                        <Card.Img className="mx-auto pokemon-card__image" src={pokemonImage} />
                        <Card.Body>
                            <Card.Title as="h3" className="pokemon-card__name">{pokemonName.replace('-', ' ')}</Card.Title>
                            <Card.Text>Base XP: {pokemonBaseXP}</Card.Text>
                            <Card.Text>Weight: {pokemonWeight} kg</Card.Text>
                            <Card.Text>Total movies: {pokemonTotalMoves}</Card.Text>
                            {!isFavorite && 
                                <Button 
                                    variant="success"
                                    onClick={() => toggleFavorite(pokemonId)}
                                    >Add Favorite</Button>
                                }
                            {isFavorite && 
                                <Button 
                                    variant="primary"
                                    onClick={() => toggleFavorite(pokemonId)}
                                >Remove Favorite</Button>
                            }
                        </Card.Body>
                        <Card.Footer className="text-muted">#{pokemonId}</Card.Footer>
                    </Card>
                </Col>

                <Col>
                    <Card className="text-center pokemon-card">
                        <Card.Header className="pokemon-card__abilities">Abilities</Card.Header>
                        <ListGroup className="list-group-flush">
                            {pokemonAbilities.map(
                                (ability, i) => (
                                    <ListGroupItem key={i}>
                                        {ability.replace('-', ' ')}
                                    </ListGroupItem>
                                )
                            )}
                        </ListGroup>
                    </Card>

                    <Card className="text-center pokemon-card">
                        <Card.Header className="pokemon-card__status">Basic Status</Card.Header>
                        <ListGroup className="list-group-flush">
                            {pokemonStats.map(
                                (stat, i) => (
                                    <ListGroupItem key={i}>
                                        {stat.name}: {stat.stat}
                                    </ListGroupItem>
                                )
                            )}
                        </ListGroup>
                    </Card>

                    <Card className="text-center pokemon-card">
                        <Card.Header className="pokemon-card__type">Type</Card.Header>
                        <ListGroup className="list-group-flush">
                            {pokemonTypes.map(
                                (type, i) => (
                                    <ListGroupItem key={i}>
                                        {type.replace('-', ' ')}
                                    </ListGroupItem>
                                )
                            )}
                        </ListGroup>
                    </Card>

                    <Card className="text-center pokemon-card">
                        <Card.Header className="pokemon-card__type">Some movies</Card.Header>
                        <ListGroup className="list-group-flush">
                            {pokemonMoves.map(
                                (move, i) => (
                                    <ListGroupItem key={i}>
                                        {move.replace('-', ' ')}
                                    </ListGroupItem>
                                )
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
