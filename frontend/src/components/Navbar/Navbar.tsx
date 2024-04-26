import { Container, Toolbar, Box, MenuItem, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import NavigationMobile from './NavbarMobile';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import Link from '@mui/material/Link';

export default function Navbar(){

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
                                Rakiety
                            </MenuItem>
                            <MenuItem>
                                Ubrania
                            </MenuItem>
                            <MenuItem>
                                Buty
                            </MenuItem>
                            <MenuItem>
                                Inne
                            </MenuItem>
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
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