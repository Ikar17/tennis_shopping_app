import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getRole, removeToken } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { Role } from "../../constants/constants";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";
import Users from "./Users";

enum Component { NEW_PRODUCT, EDIT_PRODUCT, EDIT_ORDER, USERS};

export default function AdminPage(){
    const navigate = useNavigate();

    const [selectedComponent, selectComponent] = useState(Component.NEW_PRODUCT);

    const changeComponent = (type: Component) => {
        selectComponent(type);
    }

    useEffect(() => {
        const role: Role  = getRole();
        if(role != Role.ADMIN){
            navigate("/");
        }
    }, [])

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
                            onClick={() => changeComponent(Component.NEW_PRODUCT)}
                        >
                            Dodaj nowy produkt
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={()=> changeComponent(Component.EDIT_PRODUCT)}
                        >
                            Edytuj produkt
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => changeComponent(Component.EDIT_ORDER)}
                        >
                            Edytuj zamówienie
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => changeComponent(Component.USERS)}
                        >
                            Użytkownicy
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
                    {selectedComponent === Component.NEW_PRODUCT ? (
                        <NewProduct />
                    ):
                    selectedComponent === Component.EDIT_PRODUCT ? (
                        <EditProduct />
                    ):
                    selectedComponent === Component.USERS ? (
                        <Users />
                    ):
                    (
                        <div style={{backgroundColor: "red"}}> nooo </div>
                    )}
                </Grid>
            </Grid>



        </Container>
    )

}