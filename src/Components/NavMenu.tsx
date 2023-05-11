


import { ReactComponentElement, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { AccountBalanceSharp } from '@mui/icons-material';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import CreditScoreSharpIcon from '@mui/icons-material/CreditScoreSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';






interface menuItem {
    name: string,
    path: string
}

interface menuItemIcon {
    name: React.Component,
    path: string
}

const menuItemStyle: React.CSSProperties = {
    display: 'inline',
    marginRight: '15%',
}


const menuStyle: React.CSSProperties = {
    marginTop: '2%',
    marginBottom: '5%',
    paddingTop: '2%'
}


const notLoggedInMenu: menuItem[] | any = [
    {
        name: <LoginSharpIcon fontSize='large' />,
        path: '/login'
    },
    {
        name: <HowToRegSharpIcon fontSize='large' />,
        path: '/register'
    }
];

const loggedInMenu: menuItem[] | any = [
    {
        name: <HomeSharpIcon fontSize='large' />,
        path: '/main'
    },
    {
        name: <CreditScoreSharpIcon fontSize='large'/>,
        path: '/transfer'
    }, 
    {
        name: <AccountBalanceSharp fontSize='large' />,
        path: '/transactions'
    }
]



function NavMenu() {

    const { fullUser, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        navigate('/login');
    }


    console.log(fullUser);


    const loggedInComponent = (
        loggedInMenu.map((menuItem: any, index: number) => {
            return (
                <li style={menuItemStyle} key={index}>
                        <Link to={menuItem.path}>
                            {menuItem.name}
                        </Link>
                    </li>
                )
            })
    );

    const notLoggedInComponent = (
        notLoggedInMenu.map((menuItem: any, index: number) => {
            return (
                <li style={menuItemStyle} key={index}>
                    <Link to={menuItem.path}>
                        {menuItem.name}
                    </Link>
                </li>
            )
        })
    );

    return (
        <>
            <ul style={menuStyle}>
                {
                    (!fullUser || !fullUser.user.firstName) ? notLoggedInComponent : loggedInComponent
                }
            { fullUser ? <LogoutSharpIcon color='warning' fontSize='large' onClick={logout} style={{ cursor: 'pointer' }} /> : <div></div> }
            </ul>
        </>

    );
}

export default NavMenu;