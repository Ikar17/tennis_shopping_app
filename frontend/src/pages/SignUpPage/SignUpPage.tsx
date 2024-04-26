import { Box, Button, Container, Link, TextField, Typography } from "@mui/material"
import React from "react"

export default function SignUpPage(){

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        //to do send request to backend
    }

    return(
        <Container 
            maxWidth="xs"
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 12,
                    minHeight: "70vh"
                }}
            >
                <Typography component="h1" variant="h4">
                    Utwórz konto
                </Typography>
                <Box component="form" onSubmit={ handleSubmit }>
                    <TextField
                        required
                        fullWidth
                        id="firstName"
                        label="Imię"
                        name="firstName"
                        autoComplete="given-name"
                        autoFocus
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Nazwisko"
                        name="lastName"
                        autoComplete="family-name"
                        margin="normal"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adres email"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Hasło"
                        name="password"
                        autoComplete="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Zarejestruj się
                    </Button>
                </Box>
                <Link href="/login" variant="body2">
                    Masz konto? Zaloguj się
                </Link>
            </Box>
        </Container>  
    )
}