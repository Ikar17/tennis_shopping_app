import { Container, Toolbar, Box, MenuItem, Button, FormControl, OutlinedInput, InputBase } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import NavigationMobile from './NavbarMobile';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){

    const navigate = useNavigate();

    const goToProductsPage = (event: any) => {
        const searchValue = event.target.elements.search.value;
        navigate(`/products/search/${searchValue}`);
    }

    return(
        <AppBar 
            position='sticky' 
        >
            <Container 
                maxWidth='lg'
                sx={{
                    display: 'flex',
                    minHeight: '10vh'
                }}
            >
                <Toolbar
                    variant="regular"
                    sx={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: "flex", gap: 5}}>
                        <Link href="/">
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "white"}}>
                                <SportsTennisIcon />
                                <h3>
                                    Sklep tenisowy
                                </h3>
                            </Box>
                        </Link>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <MenuItem>
                                <Link href="/products/rakiety" color="inherit" underline="none">
                                    Rakiety
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href="/products/ubrania" color="inherit" underline="none">
                                    Ubrania
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href="/products/buty" color="inherit" underline="none">
                                    Buty
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href="/products/inne" color="inherit" underline="none">
                                    Inne
                                </Link>
                            </MenuItem>
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>

                        <form onSubmit={ event => goToProductsPage(event) }>
                            <FormControl>
                                <InputBase 
                                    placeholder="Szukaj..." 
                                    sx={{ ml: 1, flex: 1, color: "white"}}
                                    name="search"
                                    />
                            </FormControl>
                        </form>

                        <Link>
                            <Button
                                color="info"
                                variant="contained"
                                sx={{
                                    gap: 1
                                }}
                            >
                                <ShoppingBasketIcon />
                                Koszyk
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                color="info"
                                variant="contained"
                                sx={{
                                    gap: 1
                                }}
                            >
                                <PersonIcon />
                                Konto
                            </Button>
                        </Link>
                    </Box>

                    {/*mobile version*/}
                    <NavigationMobile />
                    
                </Toolbar>
            </Container>
        </AppBar>
    )
}