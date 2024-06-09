import { Box, Typography } from "@mui/material";

export default function Summary(props: any){
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginTop: 10
            }}
        >
            <Typography
                component="h3" 
                variant="h5"
            >
                Dziękujemy za złożenie zamówienia. Twój numer zamówienia to: { props.orderNumber }.
            </Typography>
            <Typography
                component="h3" 
                variant="h6"
            >
                Opłać zamówienie na konto bankowe podając w tytule przelewu numer zamówienia.
            </Typography>
        </Box>
    )
}