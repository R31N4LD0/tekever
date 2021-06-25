import React from 'react';
import { Button, Container } from 'react-bootstrap';

import '../scss/Pagination.scss'

export default function Pagination({ loadNextPage, loadPrevPage, aditionalClass }) {
    return (
        <>
            <Container className={`pagination-buttons ${aditionalClass}`}>
                <Button
                    onClick={loadPrevPage}
                    disabled={!loadPrevPage}
                    size="small" 
                    variant="success"
                >
                    Prev
                </Button>{' '}
                {loadNextPage && <Button
                    onClick={loadNextPage}
                    disabled={!loadNextPage}
                    size="small" 
                    variant="success"
                >
                    Next
                </Button>}
            </Container>
        </>
    )
}
