import { Alert, Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, MenuItem, Pagination, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Product, categories } from "../../constants/constants";
import { useEffect, useState, useCallback } from "react";
import { getProductsByCategory } from "../../api/getProducts";
import EditProductForm from "./EditProductForm";

export default function EditProduct(){

    const [choosenCategory, changeCategory] = useState(categories[0]);
    const [products, setProducts] = useState<Product[]>([]);
    const [choosenProduct, setProduct] = useState<Product | null>(null);
    const [changeFlag, setChangeFlag] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    const setCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(event.currentTarget !== null && event.currentTarget.value !== null && categories.indexOf(event.currentTarget.value) !== -1){
            changeCategory(event.currentTarget.value);
            setProduct(null);
        }
    }

    const getData = async () => {
        const data = await getProductsByCategory(choosenCategory, pageNumber-1);
        if(data !== null && data.content !== null){
            setProducts(data.content);
            setPagesCount(data.totalPages);
        } 
    }

    const editProduct = async (index: number) => {
        const updatedProduct = products[index];
        setProduct(updatedProduct);
    };

    const approveChange = () => {
        setChangeFlag(!changeFlag);
    }

    useEffect(() => {
        getData();
    },[choosenCategory, changeFlag, pageNumber])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

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
                    Edycja produktu
                </Typography>
                <Grid 
                    container
                    spacing={1}
                >
                    {categories.map((category:string) => (
                        <Grid 
                            key={category}
                            item
                        >
                            <Button
                                onClick={ e => setCategory(e)}
                                value={category}
                            >
                                { category }
                            </Button>
                        </Grid>
                    ))}

                </Grid>

                {choosenProduct !== null ? (<EditProductForm product={choosenProduct} updateChange={approveChange} />) : <></> }

                <Grid
                    container
                    spacing={2}
                >
                    {products.map((product: Product, index) =>(
                        <Grid item xs={12} sm={6} md={3} key={ index }>
                            <CardActionArea component="a">
                                <Card
                                    sx={{minHeight: 400}}
                                >
                                    <CardMedia
                                        sx={{ height: 200, backgroundSize: "contain" }}
                                        image= { product.image }
                                    />
                                    <CardContent>
                                        <Typography>
                                            { product.name }
                                        </Typography>
                                        <Typography>
                                            Cena: { product.price ? product.price.toFixed(2) : ""}
                                        </Typography>
                                        <Typography>
                                            Ilość: { product.quantity }
                                        </Typography>
                                        <Button
                                            onClick={() => editProduct(index)}
                                        >
                                            Edytuj
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
            </Box>
        </div>
    )
}