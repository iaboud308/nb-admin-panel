


import '../App.css';
import { Typography } from '@mui/material';




function Header() {
    return (
        <div className="App-header">
            <Typography variant='h4' sx={{ paddingLeft: { xs: '25%', lg: '9%' }}}>
                Nama Bank
            </Typography>
        </div>
    )
}

export default Header;