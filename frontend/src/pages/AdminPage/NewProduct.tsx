import { Alert, Box, Button, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import { categories } from "../../constants/constants";
import { addNewProduct } from "../../api/addAndEditProduct";
import { useState } from "react";

export default function NewProduct(){

    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [status, setStatus] = useState(true);
    const [formValues, setFormValues] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        available: "",
        image: ""
    });

    const resetForm = () => {
        setFormValues({
            name: "",
            category: "",
            price: "",
            quantity: "",
            available: "",
            image: ""
        });
    }

    const handleChange = (event : any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const status = await addNewProduct(data);
        if(status <= 201){
            setStatus(true);
            changeSnackbarStatus(true);
            resetForm();
        } 
        else{
            setStatus(false);
            changeSnackbarStatus(true);
        }
    }

    return(
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: 3
                }}
            >
                <Typography component="h3" variant="h5">
                    Dodawanie produktu
                </Typography>
                <Box component="form" onSubmit={ handleSubmit }>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nazwa produktu"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                    <TextField
                       margin="normal"
                       required
                       select
                       fullWidth
                       id="category"
                       label="Kategoria produktu"
                       name="category"
                    >
                        {categories.map((category: string) => (
                            <MenuItem key={category} value={category}>
                                { category }
                            </MenuItem>
                        ))}

                    </TextField>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Cena"
                        name="price"
                        type="text"
                        value={formValues.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="quantity"
                        label="Ilość"
                        name="quantity"
                        type="number"
                        value={formValues.quantity}
                        onChange={handleChange}
                    />
                    <TextField
                       margin="normal"
                       required
                       select
                       fullWidth
                       id="available"
                       label="Dostępność"
                       name="available"
                    >
                        <MenuItem key={"dostępny"} value={"true"}>
                            Tak
                        </MenuItem>
                        <MenuItem key={"niedostępny"} value={"false"}>
                            Nie
                        </MenuItem>

                    </TextField>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="image"
                        helperText="Zdjęcie produktu"
                        name="image"
                        type="file"
                        value={formValues.image}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Dodaj produkt
                    </Button>
                </Box>
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
                    { status ? "Dodano produkt" : "Błąd dodania produktu"}
                </Alert>
            </Snackbar>
        </div>
    )
}