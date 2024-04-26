import { Box, Button, Container, Link, TextField, Typography } from "@mui/material"
import React from "react"

export default function SignInPage(){

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
                    Logowanie
                </Typography>
                <Box component="form" onSubmit={ handleSubmit }>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adres email"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        Zaloguj się
                    </Button>
                </Box>
                <Link href="#" variant="body2">
                    Nie masz konta? Zarejestruj się
                </Link>
            </Box>
        </Container>  
    )
}