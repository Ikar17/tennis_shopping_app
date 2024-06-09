import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';
import baner from "../../assets/baner.jpg";
import React, { useEffect, useState } from 'react';
import { Product } from '../../constants/constants';
import { getLastAddedProducts } from '../../api/getProducts';

export default function MainPage(){

    const[products, setProducts] = useState<Product[]>([]);

    const getData = async () => {
        const limit = 8;
        const data = await getLastAddedProducts(limit);
        if(data == null) return;
        setProducts(data);
    }

    useEffect(() => {
        getData();
    },[])


    return(
        <Box>
            <Paper  
                sx={{
                    height: "90vh",
                    width: "100%",
                    backgroundImage: `url(${baner})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "center"
                }} 
            />
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
                    color="text.primary"
                    gutterBottom
                >
                    Ostatnio dodane produkty
                </Typography>
                <Grid container spacing={2}>
                    { products.map((product: Product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={ index }>
                            <CardActionArea component="a">
                                <Card>
                                    <CardMedia 
                                        sx={{ height: 200 }}
                                        image={ product.image }
                                        title={ product.name }
                                    >
                                        <Button />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography>
                                            { product.name }
                                        </Typography>
                                        <Typography>
                                            Cena: { product.price }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box> 
    )
}