import { Alert, Box, Button, Container, Link, Snackbar, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import signup from "../../api/signup";

export default function SignUpPage(){

    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [status, setStatus] = useState(true);

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const status = await signup(data);
        if(status >= 400){
            setStatus(false);
            changeSnackbarStatus(true);
        }else{
            setStatus(true);
            changeSnackbarStatus(true);
        } 
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
                        id="firstname"
                        label="Imię"
                        name="firstname"
                        autoComplete="given-name"
                        autoFocus
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        id="lastname"
                        label="Nazwisko"
                        name="lastname"
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
                        type="password"
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

            <Snackbar
                open={ snackbarStatus }
                autoHideDuration={ 6000 }
                onClose={ closeSnackbar }
            >
                <Alert
                    onClose={ closeSnackbar }
                    severity= { status ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    { status ? "Zarejestrowano się. Zaloguj się" : "Błąd rejestracji. Spróbuj później lub innym mailem"}
                </Alert>
            </Snackbar>

        </Container>  
    )
}