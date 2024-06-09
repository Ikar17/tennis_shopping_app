import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getRole, removeToken } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { Role } from "../../constants/constants";
import UserDetails from "./UserDetails";
import UserOrders from "./UserOrders";

enum Component { ORDERS, USER};

export default function UserPage(){
    const navigate = useNavigate();
    const [selectedComponent, selectComponent] = useState(Component.USER);

    useEffect(() => {
        const role: Role  = getRole();
        if(role != Role.USER){
            navigate("/");
        }
    }, [])

    const changeComponent = (type: Component) => {
        selectComponent(type);
    }

    const logout = () => {
        removeToken();
        navigate("/login");
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
                <Grid item xs={12} md={3}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                    >
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => changeComponent(Component.USER)}
                        >
                            Moje dane
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={()=> changeComponent(Component.ORDERS)}
                        >
                            Moje zamówienia
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => logout() }
                        >
                            Wyloguj się
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    {selectedComponent === Component.USER ? (
                        <UserDetails />
                    ):
                    selectedComponent === Component.ORDERS ? (
                        <UserOrders />
                    ):
                    (
                        <div />
                    )}
                </Grid>
            </Grid>
        </Container>
    )

}