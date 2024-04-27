import { Alert, Box, Button, Container, Link, Snackbar, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import signin from "../../api/signin";
import { useNavigate } from "react-router-dom";

export default function SignInPage(){

    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const navigate = useNavigate();

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const status = await signin(data);
        if(status >= 400) changeSnackbarStatus(true);
        else if(status >= 200) navigate("/"); // to do redirect to account page
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
                        type="password"
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
                <Link href="/register" variant="body2">
                    Nie masz konta? Zarejestruj się
                </Link>
            </Box>
            <Snackbar
                open={ snackbarStatus }
                autoHideDuration={ 6000 }
                onClose={ closeSnackbar }
            >
                <Alert
                    onClose={ closeSnackbar }
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Niepoprawny email lub hasło
                </Alert>
            </Snackbar>
        </Container>  
    )
}