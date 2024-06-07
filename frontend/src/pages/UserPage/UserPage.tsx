import { Box } from "@mui/material";
import { useEffect } from "react";
import { getRole } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { Role } from "../../constants/constants";

export default function UserPage(){
    const navigate = useNavigate();

    useEffect(() => {
        const role: Role  = getRole();
        if(role != Role.USER){
            navigate("/");
        }
    }, [])

    return(
        <Box>



        </Box>
    )

}