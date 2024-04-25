import { Container } from '@mui/material';
import React from 'react';

export default function MainPage(){
    return(
        <Container 
            maxWidth="lg"
            sx={{
                minHeight: "80vh",
            }}
        >
            Products
        </Container>
    )
}