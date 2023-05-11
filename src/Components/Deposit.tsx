


import { Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";



const formStyle= {
    display: 'block',
    marginLeft: '2%',
    marginBottom: '2%',
}



export default function Deposit() {

    const { fullUser, setUser }: any = useContext(UserContext);
    const [amount, setAmount] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(!fullUser || !fullUser.transactions) {
            navigate('/login');
        }
    }, []);


    if(!fullUser || !fullUser.user.firstName) {
        return (
            <Typography variant="h4">Please Login</Typography>
        );
    }

    const { user } = fullUser;

    const handleChange = (e: any) => {
        setAmount(e.target.value);
    }

    const handleSubmit = async () => {
        const payload = {
            id: user.id,
            amount
        }
        console.log(payload);
    }


    return (
        <div style={{ width: '60%' }}>
            <Typography variant="h4" style={formStyle}>Deposit</Typography>
            <TextField fullWidth style={formStyle} variant='filled' label='Amount' onChange={handleChange}/>
            <Button style={formStyle} variant="contained" onClick={handleSubmit} size="large" fullWidth>Deposit</Button>
        </div>
    );
}