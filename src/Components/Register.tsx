


import { useContext, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import config from './../appConfig';
import { UserContext } from "../Context/UserContext";


// const formStyle= {
//     display: 'block',
//     marginLeft: '2%',
//     marginBottom: '5%',
// }

const formStyle = {
    marginLeft: { xs: '5%', lg: '2%' },
    marginBottom: { xs: '4%', lg: '1%' }
}


function Register() {


    const { fullUser } = useContext(UserContext);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] =   useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');


    if(fullUser) {
        return (
            <div>
                <Typography variant="h4">You are logged in</Typography>
            </div>
        );
    }


    const stateMapper: any = {
        firstName: setFirstName,
        lastName: setLastName,
        email: setEmail,
        password: setPassword
    }


    const handleChange = (e: any) => {
        stateMapper[e.target.name](e.target.value);
        setErrorMessage('');
    }

    
    const handleSubmit = async () => {
        const payload = {
            firstName, lastName, email, password
        }
        console.log(payload);

        if(!firstName || !lastName || !email || !password) {
            setErrorMessage('Please fill out your details correctly');
            return;
        }

        try {
            const request = await fetch(`${config.endpoint}/userregistration`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if(request.status !== 200) {
                throw request;
            }
            const jsonRequest = await request.json();
            setErrorMessage('Your request has been submitted succesfully. You may now login');    
        } catch (e) {
            console.log(e);
            setErrorMessage('Error');

        }

    }


    return (
        <div style={{ width: '90%' }}>
            <Typography variant="h4" sx={formStyle}>Register</Typography>
            <TextField sx={formStyle} fullWidth label='First Name' variant='filled' onChange={handleChange} name="firstName" />
            <TextField sx={formStyle} fullWidth label='Last Name' variant='filled' onChange={handleChange} name="lastName" />
            <TextField sx={formStyle} fullWidth label='Email' variant='filled' onChange={handleChange} name="email" />
            <TextField type='password' fullWidth sx={formStyle} label='Password' variant='filled' onChange={handleChange} name="password" />
            <Button sx={formStyle} fullWidth variant='contained' size='large' onClick={handleSubmit}>Register</Button>
            <Typography sx={formStyle}>
                {errorMessage}
            </Typography>
        </div>
    )
}

export default Register;