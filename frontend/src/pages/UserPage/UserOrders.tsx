import { Box, Typography } from "@mui/material";
import { getMyOrders } from "../../api/order";
import { useEffect, useState } from "react";
import { OrderDetails } from "../../constants/constants";

export default function UserOrders(){

    const[orders, setOrders] = useState<OrderDetails[]>([]);

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {
        const data = await getMyOrders();
        if(data == null || data.content == null) return;
        const orderDetails: OrderDetails[] = data.content;
        setOrders(orderDetails);
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


    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mx: 5,
                gap: 2
            }}
        >
            <Typography component="h3" variant="h5" >
                Moje zamówienia
            </Typography>
            {orders.map((order: OrderDetails, index) => (
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
                            Data złożenia: { formatDate(order.createdAt) }
                        </Typography>
                        <Typography>
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
                    <Typography sx={{color: "#478978"}}>
                        Status: {order.orderStatus}
                    </Typography>
                </Box>
            ))}

        </Box>
    )
}