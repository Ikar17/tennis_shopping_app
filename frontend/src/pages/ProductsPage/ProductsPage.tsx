import { Alert, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Pagination, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory, getProductsByName } from "../../api/getProducts";
import { Product } from "../../constants/constants";
import { addProductToBasket } from "../../utils/basket";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function ProductsPage(){

    const { category, name } = useParams();
    const [products, setProducts] = useState([]);
    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect(() => {
        getProducts();
    }, [pageNumber]);

    const getProducts = async() => {
        if(category == undefined && name == undefined) return;

        let response = null;
        if(category !== undefined) response = await getProductsByCategory(category, pageNumber-1);
        else if(name !== undefined) response = await getProductsByName(name, pageNumber-1);
        if(response == null){
            setProducts([]);
            return;
        };

        const availableProducts = response.content.filter((product: Product) => product.available == true);
        setProducts(availableProducts);
        setPagesCount(response.totalPages);
    }

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

    return(
        <Container 
            maxWidth="lg"
            sx={{
                minHeight: "80vh",
                pt: "30px"
            }}
        >
            <Grid container spacing={2}>
                { products.map((product: Product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={ index }>
                        <CardActionArea component="a">
                            <Card
                                sx={{
                                    minHeight: 420
                                }}
                            >
                                <CardMedia
                                    sx={{ height: 260, backgroundSize: "contain"}}
                                    title={ product.name }
                                    image= { product.image }
                                >
                                    <Button />
                                </CardMedia>
                                <CardContent>
                                    <Typography>
                                        { product.name }
                                    </Typography>
                                    <Typography>
                                        Cena: { product.price ? product.price.toFixed(2) + " zł" : "" }
                                    </Typography>
                                    <Button
                                        onClick={() =>{
                                            addProductToBasket(product);
                                            changeSnackbarStatus(true);
                                        }}
                                        sx={{
                                            display: "flex",
                                            gap: 1
                                        }}
                                    >
                                        <ShoppingBasketIcon />
                                        <Typography>
                                            Dodaj do koszyka
                                        </Typography>
                                    </Button>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
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
                    severity= "success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Dodano produkt do koszyka
                </Alert>
            </Snackbar>


        </Container>
    )
}