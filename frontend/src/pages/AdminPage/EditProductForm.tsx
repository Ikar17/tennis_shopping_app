import { Alert, Box, Button, MenuItem, Snackbar, TextField } from "@mui/material"
import { categories } from "../../constants/constants"
import { useEffect, useState } from "react";
import { editProduct } from "../../api/addAndEditProduct";

export default function EditProductForm(props:any){
    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [status, setStatus] = useState(true);

    const product = props.product;
    const [formValues, setFormValues] = useState({
        id: product && product.id ? product.id : -1,
        name: product && product.name ? product.name : "",
        category: product && product.category ? product.category.name : "",
        price: product && product.price ? product.price.toFixed(2) : "",
        quantity: product && product.quantity ? product.quantity : "",
        available: product && product.available ? product.available : "",
        image: product && product.image ? product.image : ""
    });

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    useEffect(() => {
        const product = props.product;
        setFormValues(
            {
                id: product && product.id ? product.id : -1,
                name: product && product.name ? product.name : "",
                category: product && product.category ? product.category.name : "",
                price: product && product.price ? product.price.toFixed(2) : "",
                quantity: product && product.quantity ? product.quantity : "",
                available: product && product.available ? product.available : "",
                image: ""
            }
        )
    },[props.product])

    const changeProduct = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const status = await editProduct(formValues.id, formData);
        if(status <= 201){
            setStatus(true);
            changeSnackbarStatus(true);
            props.updateChange();
        } 
        else{
            setStatus(false);
            changeSnackbarStatus(true);
        }
    }

    if(product !== null)
    return(
        <div>
            <Box 
                component="form" 
                sx={{border: "1px solid black", padding: "10px", marginBottom: "10px"}} 
                onSubmit={e => changeProduct(e)}
            >
                <TextField
                    fullWidth
                    required
                    helperText="Nazwa produktu"
                    value={formValues.name}
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => handleChangeInput(e)}
                />
                <TextField
                    margin="normal"
                    required
                    select
                    helperText="Kategoria produktu"
                    value={formValues.category}
                    name="category"
                    onChange={(e) => handleChangeInput(e)}
                >
                    {categories.map((category: string) => (
                        <MenuItem key={category} value={category} >
                            { category }
                        </MenuItem> 
                    ))}

                </TextField>
                <TextField
                    margin="normal"
                    required
                    helperText="Cena"
                    type="text"
                    value={formValues.price}
                    name="price"
                    onChange={(e) => handleChangeInput(e)}
                />
                <TextField
                    margin="normal"
                    required
                    type="number"
                    helperText="Ilość"
                    value={formValues.quantity}
                    name="quantity"
                    onChange={(e) => handleChangeInput(e)}
                />
                <TextField
                    margin="normal"
                    required
                    select
                    id="available"
                    helperText="Dostępność"
                    name="available"
                    value={formValues.available}
                    onChange={(e) => handleChangeInput(e)}
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
                    helperText="Zdjęcie produktu"
                    type="file"
                    name="image"
                    onChange={(e) => handleChangeInput(e)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Zmień
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
                    { status ? "Zaktualizowano produkt" : "Błąd edycji produktu"}
                </Alert>
            </Snackbar>
        </div>
    )
    else return null;
}