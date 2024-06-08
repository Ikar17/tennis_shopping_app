import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory, getProductsByName } from "../../api/getProducts";
import { Product } from "../../constants/constants";

export default function ProductsPage(){

    const { category, name } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async() => {
        if(category == undefined && name == undefined) return;

        console.log(category, name);

        let response = null;
        if(category !== undefined) response = await getProductsByCategory(category);
        else if(name !== undefined) response = await getProductsByName(name);
        if(response == null){
            setProducts([]);
            return;
        };

        setProducts(response.content);
    }

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
                            <Card>
                                <CardMedia
                                    sx={{ height: 200 }}
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
                                        Cena: { product.price ? product.price.toFixed(2) : "" }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>


        </Container>
    )
}