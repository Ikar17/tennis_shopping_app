import { Box, MenuItem, Button, Divider } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavbarMobile(){

    const [open, setOpen] = useState(false);
    const toggleMenu = (newOpen : boolean) => () => {
        setOpen(newOpen);
    };

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

                    <Divider />

                    <MenuItem>
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
                    </MenuItem>
                    <MenuItem>
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
                  </MenuItem>
                </Box>
            </Drawer>
        </Box>
    )
}