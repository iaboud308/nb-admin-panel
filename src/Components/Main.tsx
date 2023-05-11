



import { Box, Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";



function Main() {

    const { fullUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!fullUser || !fullUser.transactions) {
            navigate('/login');
        }
    }, []);

    const noUser = (
        <div>
            <Typography variant="h4">Please Login</Typography>
        </div>
    );

    if (!fullUser || !fullUser.user.firstName) {
        return noUser;
    }

    const { user } = fullUser;

    const loggedInComponent = (
        <div>
            <Container>
                <Box paddingTop={4}>
                    <Typography variant="h4">Welcome { `${user.firstName} ${user.lastName}` }</Typography>
                    <Typography variant="h4">Your Total Balance is:</Typography>
                    <Typography variant="h1" style={{ display: 'inline'}} >£{ user.balance }</Typography>   
                </Box>
            </Container>
        </div>
    );

    return (
        loggedInComponent
    );
    
}

export default Main;