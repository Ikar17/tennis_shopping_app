
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout(){
    return (
        <Box 
            sx={{
                bgcolor: '#dad7cd',
                minHeight: "100vh",
            }}
        >
            <Navbar />
                <Outlet />
            <Footer />
        </Box>
    )
} 