


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Deposit from './Deposit';
import Login from './Login';
import Main from './Main';
import Register from './Register';
import TransactionsMobile from './TransactionsMobile';
import Transfer from './Transfer';
import Withdraw from './Withdraw';


function NamaBank() {

    return (
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/main' element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/transfer' element={<Transfer />} />
                <Route path='/withdraw' element={<Withdraw />} />
                <Route path='/deposit' element={<Deposit />} />
                <Route path='transactions' element={<TransactionsMobile />} />
            </Routes>
    )
}

export default NamaBank;