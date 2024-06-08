import { Box, MenuItem, Button, Divider, Link, FormControl, InputBase } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function NavbarMobile(){

    const [open, setOpen] = useState(false);
    const toggleMenu = (newOpen : boolean) => () => {
        setOpen(newOpen);
    };

    const navigate = useNavigate();

    const goToProductsPage = (event: any) => {
        const searchValue = event.target.elements.search.value;

        toggleMenu(false);
        navigate(`/products/search/${searchValue}`);
    }

    return(
        <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <Button
                variant="contained"
                color="primary"
                onClick={ toggleMenu(true) }
                sx={{ minWidth: '40px', p: '4px' }}
            >
                <MenuIcon />
            </Button>

            <Drawer 
                anchor="right" 
                open={open} 
                onClose={ toggleMenu(false) }
            >
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                > 

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

                    <Divider />

                    <MenuItem>
                        <form onSubmit={ event => goToProductsPage(event) }>
                            <FormControl>
                                <InputBase 
                                    placeholder="Szukaj..." 
                                    sx={{ ml: 1, flex: 1, color: "black"}}
                                    name="search"
                                    />
                            </FormControl>
                        </form>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/basket">
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
                    </MenuItem>
                    <MenuItem>
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
                  </MenuItem>
                </Box>
            </Drawer>
        </Box>
    )
}