

import { Typography, Table, TableBody, TableRow, TableCell, TableHead, } from "@mui/material";
// import { blue, red } from "@mui/material/colors";
import { useContext } from "react";
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
    console.log(fullUser);

    if(!fullUser || !fullUser.transactions) {
        return (
            <Typography variant="h4">Please Login</Typography>
        );
    }

    const { transactions } = fullUser;

    console.log(transactions);

    return(
        <div style={{ width: '60%' }}>
            <Typography variant="h4">Transactions</Typography>
                <Table sx={{ maxWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Agent Name</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Date of Transaction</TableCell>
                            <TableCell>Time of Transaction</TableCell>
                            <TableCell>Type of Transaction</TableCell>
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
                                        <TableCell>{t.user.firstName}</TableCell>
                                        <TableCell>{t.user.lastName}</TableCell>
                                        <TableCell>{dateAndTime.formattedDate}</TableCell>
                                        <TableCell>{dateAndTime.formattedTime}</TableCell>
                                        <TableCell>{t.description ? t.description : '----'}</TableCell>
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