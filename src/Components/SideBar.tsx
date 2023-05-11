



import { Container } from "@mui/material";
import NavMenu from "./NavMenu";

const sideBarStyle: React.CSSProperties = {
    backgroundColor: '#282c34',
    color: 'white',
    position: 'fixed',
    bottom: '0%',
    height: '12vh',
    width: '100%',
}


function SideBar() {
    return (
        <div style={sideBarStyle}>
            <Container>
                <NavMenu />
            </Container>
        </div>
    )
}

export default SideBar;