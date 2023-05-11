


import { Button, TextField, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import config from "../appConfig";
import { useNavigate } from "react-router-dom";



const formStyle= {
    display: 'block',
    marginLeft: '2%',
    marginBottom: '2%',
}



export default function Withdraw() {

    const { fullUser, setUser } = useContext(UserContext);
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

        try {
            const request = await fetch(`${config.endpoint}/withdraw`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            const jsonRequest = await request.json();
            console.log(jsonRequest);
        } catch (e) {
            console.log(e);
        }

    }




    return (
        <div style={{ width: '60%' }}>
            <Typography variant="h4" style={formStyle}>Withdraw</Typography>
            <TextField fullWidth style={formStyle} variant='filled' label='Amount' onChange={handleChange}/>
            <Button style={formStyle} variant="contained" onClick={handleSubmit} size="large" fullWidth>Withdraw</Button>
        </div>
    );
}
