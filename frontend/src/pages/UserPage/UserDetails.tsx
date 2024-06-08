import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "../../api/user";
import { User } from "../../constants/constants";

export default function UserDetails(){

    const [details, setDetails] = useState({
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        number: ""
    });
    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const data: User = await getUserDetails();
        if(data == null) return;

        setDetails({
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            number: data.number
        })
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setDetails({
            ...details,
            [name]: value
        });
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const status = await updateUserDetails(formData);
        if(status <= 201){
            setStatus(true);
            changeSnackbarStatus(true);
        } 
        else{
            setStatus(false);
            changeSnackbarStatus(true);
        }
    }

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 3
            }}
        >
            <Typography component="h3" variant="h5">
               Moje dane
            </Typography>
            <Box component="form" onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    fullWidth
                    required
                    helperText="Email"
                    value={details.email}
                    type="text"
                    name="email"
                    id="email"
                    disabled
                />
                <TextField
                    fullWidth
                    required
                    helperText="Imie"
                    value={details.firstname}
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={(e) => handleChangeInput(e)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    helperText="Nazwisko"
                    value={details.lastname}
                    name="lastname"
                    id="lastname"
                    onChange={(e) => handleChangeInput(e)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    helperText="Adres"
                    type="text"
                    value={details.address}
                    name="address"
                    id="address"
                    onChange={(e) => handleChangeInput(e)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    helperText="Numer telefonu"
                    type="text"
                    value={details.number}
                    name="number"
                    id="number"
                    onChange={(e) => handleChangeInput(e)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Zaktualizuj
                </Button>
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
                    { status ? "Zaktualizowano dane" : "Błąd aktualizacji. Spróbuj ponownie później"}
                </Alert>
            </Snackbar>

        </Box>
    )
}