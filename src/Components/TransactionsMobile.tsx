


import { Typography, Table, TableBody, TableRow, TableCell, TableHead, Box, } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


const withdrawClass = {
    backgroundColor: '#770F05'
}


const depositClass = {
    backgroundColor: '#165c6b'
}


const DateFormat = (dateInput: string) => {
    let formattedDate = dateInput.slice(0, 10);
    const formattedTime = dateInput.slice(11, 16);

    return {
        formattedDate, formattedTime
    }
}



export default function Transactions() {

    const { fullUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!fullUser || !fullUser.transactions) {
            navigate('/login');
        }
    }, []);

    console.log(fullUser);

    if(!fullUser || !fullUser.transactions) {
        return (
            <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 200, height: '87vh' }}>
                <Typography variant="h4">Please Login</Typography>
            </Box>
        );
    }

    const { transactions } = fullUser;

    console.log('Mobile');


    return(
        <div style={{  }}>
            <Typography variant="h4">Transactions</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Agent Name</TableCell>
                            <TableCell>Date of Transaction</TableCell>
                            <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' }}}>Time of Transaction</TableCell>
                            <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' }}} >Type of Transaction</TableCell>
                            <TableCell>New Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transactions.map(((t: any, index: number) => {
                                const rowClass = t.state === 0 ? depositClass : withdrawClass;
                                const dateAndTime = DateFormat(t.date);
                                return (
                                    <TableRow key={index} >
                                        <TableCell>{t.state === 0 ? '+' : '-' }{t.amount}</TableCell>
                                        <TableCell>{t.user.firstName} {t.user.lastName}</TableCell>
                                        <TableCell>{dateAndTime.formattedDate}</TableCell>
                                        <TableCell sx={{ display: { xs: 'none', lg: 'table-cell'}}}>{dateAndTime.formattedTime}</TableCell>
                                        <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' }}} >{t.description ? t.description : '----'}</TableCell>
                                        <TableCell>{t.newBalance}</TableCell>
                                    </TableRow>
                                );
                            }))
                        }
                    </TableBody>
                </Table>
        </div>
    );
}