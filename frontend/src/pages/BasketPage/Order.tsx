import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { getToken } from "../../utils/tokenUtils"
import { useEffect, useState } from "react";

export default function Order(props:any){
    const token = getToken();
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        setProducts(props.products);
    }, [props.products])

    if(token == null)
    return(
        <Box
            sx={{
                display:"flex",
                flexDirection: "column",
                alignItems:"center"
            }}
        >
            <Typography
                component="h3" 
                variant="h5"
            >
                Zaloguj się aby złożyć zamówienie
            </Typography>
            <Link href="/login">
                <Button>
                    Logowanie
                </Button>
            </Link>
            <Link href="/register">
                <Button>
                    Rejestracja
                </Button>
            </Link>
        </Box>
    )

    else
    return(
        <Box>
            <Typography
                component="h3" 
                variant="h5"
                sx={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: 5
                }}
            >
                Podsumowanie
            </Typography>

            <Box>
                <Typography>
                    Imie nazwisko
                </Typography>
                <Typography>
                    Adres
                </Typography>
                <Typography>
                    Email
                </Typography>
                <Typography>
                    Numer telefonu
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        component="h4" 
                        variant="h6"
                    >
                        Łącznie: {props.cost ? props.cost.toFixed(2) + " zł" : ""}
                    </Typography>
                    <Button
                        color="info"
                        variant="contained"
                    >
                        Złóż zamówienie
                    </Button>
                </Box>
            </Box>
        </Box>
        
    )
}