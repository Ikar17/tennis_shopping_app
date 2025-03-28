import { Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Product } from "../../constants/constants";
import { getAllProducts, removeAllItems, removeProductFromBasket } from "../../utils/basket";
import ClearIcon from '@mui/icons-material/Clear';
import Order from "./Order";
import Summary from "./Summary";

export default function BasketPage(){

    const [products, setProducts] = useState<Product[]>([]);
    const [cost, setCost] = useState(0);
    const [summary, setSummary] = useState(false);
    const [orderNumber, setOrderNumber] = useState(-1);

    useEffect(() => {
        const data = getAllProducts();
        setProducts(data);
        setCost(countCost(data));
    },[])

    const removeItem = (product: Product) => {
        removeProductFromBasket(product.id);
        const data = getAllProducts();
        setProducts(data);
        setCost(countCost(data));
    }

    const countCost = (listProducts: Product[]) => {
        return listProducts.reduce((total, product) => total + product.price, 0);
    }

    const goToSummary = () => {
        setSummary(true);
        removeAllItems();
        setProducts([]);
    }

    return(
        <Container
            maxWidth="lg"
            sx={{
                minHeight: "80vh",
                pt: "30px"
            }}
        >
            <Typography 
                component="h2" 
                variant="h4"
                sx={{ width:"100%", textAlign:"center"}}
            >
                Koszyk
            </Typography>
            {products.map((product:Product) =>(
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 3,
                        border: "1px solid black",
                        padding: 2,
                        margin: 2,
                        boxSizing: "border-box"
                    }}
                
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                        }}
                    >
                        <img src={product.image} style={{ maxWidth:"100px"}}/>
                        <Typography>
                            { product.name }
                        </Typography>
                        <Typography>
                            { product.price ? product.price.toFixed(2) + " zł" : ""}
                        </Typography>
                    </Box>
                    <Button
                        sx={{
                            color: "red"
                        }}
                        onClick={() => removeItem(product)}
                    >
                        <ClearIcon />
                        <Typography>
                            Usuń z koszyka
                        </Typography>
                    </Button>
                </Box>
            ))}

            {!summary ? 
                (
                    products.length == 0 ?
                        <Typography
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                marginTop: 10
                            }}
                        >
                            Pusty koszyk
                        </Typography>
                    :
                    <Order cost={cost} products={products} setSummary={goToSummary} setOrderNumber={setOrderNumber} />
                )
            :
                <Summary orderNumber={orderNumber} />
            }

        </Container>
    )

}