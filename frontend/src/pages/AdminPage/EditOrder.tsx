import { Alert, Box, Button, MenuItem, Pagination, Snackbar, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { OrderDetails, orderStatus } from "../../constants/constants";
import { getAllOrders, updateOrder } from "../../api/order";

export default function EditOrder(){

    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [status, setStatus] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect(() => {
        getData();
    },[pageNumber])

    const getData = async () => {
        const data = await getAllOrders(pageNumber-1);
        if(data == null || data.content == null) return;
        setOrders(data.content);
        setPagesCount(data.totalPages);
    }

    const handleChangeInput = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const updatedOrders = [...orders];

        updatedOrders[index] = {
            ...updatedOrders[index],
            [name]: value
        };

        setOrders(updatedOrders);
    }

    const handleSubmit = async (order: OrderDetails, event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const status = await updateOrder(order);
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

    const formatDate = (dateString: string): string  => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 3,
                gap: 1
            }}
        >
            <Typography component="h3" variant="h5">
                Edycja zamówień
            </Typography>
            {orders.map((order: OrderDetails,index) =>(
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "1px solid black",
                        padding: 2,
                        width: "100%"
                    }}
                >
                    <Box>
                        <Typography component="h4" variant="h6">
                            Zamówienie nr: { order.id }
                        </Typography>
                        <Typography> 
                            Data: {formatDate(order.createdAt)}
                        </Typography>
                        <Typography sx={{fontWeight:"bold"}}> 
                            Dane klienta:
                        </Typography>
                        <Typography>
                            Imię i nazwisko: { order.user.firstname + " " + order.user.lastname }
                        </Typography>
                        <Typography>
                            Adres: { order.user.address }
                        </Typography>
                        <Typography>
                            Telefon: { order.user.number }
                        </Typography>
                        <Typography>
                            Email: { order.user.email }
                        </Typography>
                        <Typography sx={{fontWeight:"bold"}}>
                            Produkty:
                        </Typography>
                        {order.products.map((product, index) => (
                            <Box
                                key={product.name + index}
                                sx={{
                                    paddingLeft: 1
                                }}
                            >
                                <Typography>
                                    {product.name + " - " } 
                                    {product.price ? product.price.toFixed(2) + " zł" : ""}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                        component="form"
                        onSubmit={(e) => handleSubmit(order, e)}
                    >
                        <TextField
                            helperText="Status"
                            select
                            name="orderStatus"
                            value={order.orderStatus}
                            onChange={(e) => handleChangeInput(index, e)}
                        >
                            {orderStatus.map((status) =>(
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}

                        </TextField>
                        <Button type="submit">
                            Zatwierdź zmiany
                        </Button>
                    </Box>
                </Box>
            ))}

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 3
                    }}
                >
                    <Stack spacing={2}>
                        <Pagination count={pagesCount} page={pageNumber} onChange={handleChange} />
                    </Stack>
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
                    { status ? "Zaktualizowano zamówienie" : "Błąd edycji zamówienia"}
                </Alert>
            </Snackbar>


        </Box>
    )
}