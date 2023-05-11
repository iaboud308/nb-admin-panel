


import { TextField, Typography, Button, Container } from '@mui/material';
import config from '../appConfig';
import { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';


const formStyle= {
    display: 'block',
    marginLeft: '2%',
    marginBottom: '2%'
}


function Login() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    

    const stateMapper: any = {
        email: setEmail,
        password: setPassword
    }

    const handleChange = (e: any) => {
        stateMapper[e.target.name](e.target.value);
    }

    const handleSubmit = async (e: any) => {
       
        const payload = {
            Email: email,
            Password: password
        }

        if(!email || !password) {
            setErrorMessage('Please Enter Your Details');
            return;
        }

        console.log(JSON.stringify(payload));
        try {
            let request = await fetch(`${config.endpoint}/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            let jsonRequest = await request.json();
            console.log(request);
            console.log(jsonRequest);
            if(jsonRequest === false) {
                throw jsonRequest;
            }

            setUser(jsonRequest);
            navigate('/main');
        } catch(e) {
            console.log(e);
            setErrorMessage('Please check your details and try again');
        }

    }



    return(
        <Container>
            <Typography style={formStyle} variant='h4'> Login </Typography>
            <TextField fullWidth style={formStyle} variant='filled' label='Email' name='email' onChange={handleChange} />
            <TextField fullWidth type='password' style={formStyle} variant='filled' label='Password' name='password' onChange={handleChange} />
            <Button fullWidth style={formStyle} variant='contained' size='large' onClick={handleSubmit}>Login</Button>
            <div style={formStyle}>
                {errorMessage}
            </div>
        </Container>
    )
}

export default Login;