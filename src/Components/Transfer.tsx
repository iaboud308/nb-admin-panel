



import { Typography, TextField, Button, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import config from '../appConfig';
import { useNavigate } from "react-router-dom";



const formStyle = {
    marginLeft: {
        xs: '5%', lg: '2%'
    },
    marginBottom: {
        xs: '5%', lg: '2%'
    }
}


export default function Transfer() {

    const { fullUser, setUser } = useContext(UserContext);
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(!fullUser || !fullUser.transactions) {
            navigate('/login');
        }
    }, []);
    

    if(!fullUser || !fullUser.user.firstName) {
        return (
            <Typography variant="h4">Please Log In</Typography>
        );
    }

    const { user } = fullUser;

    const stateMapper: any = {
        to: setTo,
        amount: setAmount
    }

    const handleChange = (e: any) => {
        stateMapper[e.target.name](e.target.value);
        setErrorMessage('');
    }

    const handleSubmit = async () => {
        const payload = {
            from: user.id,
            to, 
            amount
        }
        console.log(payload);

        if(!to || !amount) {
            setErrorMessage('Please fill out the details');
            return;
        }

        try {
            const request = await fetch(`${config.endpoint}/transfer`, {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(payload)
            });
    
            
            if(request.status !== 200) {
                throw request;
            }

            const jsonRequest = await request.json();
            console.log(request);
            console.log(jsonRequest);

            setUser(jsonRequest);
            setErrorMessage('You request has been processed');
            setAmount('');
            setTo('');
        } catch(e: any) {
            const message = await e.text();
            console.log(message);
            setErrorMessage(message);
            setAmount('');
            setTo('');
        }


    }



    return (
        <div style={{ width: '90%' }}>
            <Typography sx={formStyle} variant="h4">Transfer To: </Typography>
            <TextField fullWidth label='Email' name='to' variant='filled'  sx={formStyle} onChange={handleChange} value={to} />
            <TextField fullWidth label='Amount' name='amount' variant='filled' sx={formStyle} onChange={handleChange} value={amount} />
            <Button fullWidth variant="contained" size="large" onClick={handleSubmit} sx={formStyle} >Transfer</Button>
            <Typography sx={{paddingLeft: { xs: '6%', lg: '3%' }}}>
                {errorMessage}
            </Typography>
            
        </div>
    )
}