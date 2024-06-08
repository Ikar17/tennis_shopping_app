import { useEffect, useState } from "react"
import { getAllUsers, promoteToAdmin } from "../../api/user";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { User } from "../../constants/constants";

export default function Users(){
    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [status, setStatus] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const data = await getAllUsers();
        if(data == null || data.content == null) return;
        setUsers(data.content);
    }

    const handleSubmit = async (email: string) => {
        const status = await promoteToAdmin(email);
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
                px: 3,
                gap: 2
            }}
        >
            <Typography component="h3" variant="h5">
                    Użytkownicy
            </Typography>

            {users.map((user: User) =>(
                <Box
                    key={user.email}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "100%",
                        border: "1px solid black",
                        padding: 2
                    }}
                >
                    <Typography>
                        Email: {user.email}
                    </Typography>
                    <Typography>
                        Imię: {user.firstname}
                    </Typography>
                    <Typography>
                        Nazwisko: {user.lastname}
                    </Typography>

                    {user.role != "ADMIN" ? (
                        <Button onClick={() => handleSubmit(user.email)}>
                            Nadaj uprawnienia Admina
                        </Button>
                    ):(
                        <Typography
                            sx={{
                                color: "red"
                            }}
                        >
                           Admin
                        </Typography>
                    )}
                </Box>
            ))}

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
                    { status ? "Zaktualizowano użytkownika. Odśwież stronę." : "Błąd aktualizacji. Spróbuj ponownie później"}
                </Alert>
            </Snackbar>

        </Box>
    )

}