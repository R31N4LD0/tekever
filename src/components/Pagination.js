import React from 'react';
import { Button } from 'react-bootstrap';

export default function Pagination({ loadNextPage, loadPrevPage }) {
    return (
        <>
            <Button
                onClick={loadPrevPage}
                disabled={!loadPrevPage}
                size="small" 
                variant="success">
                Prev
            </Button>{' '}
            {loadNextPage && <Button
                onClick={loadNextPage}
                disabled={!loadNextPage}
                size="small" 
                variant="success">
                Next
            </Button>}{' '}
        </>
    )
}
