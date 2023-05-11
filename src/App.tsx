import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import NamaBank from './Components/NamaBank';
import SideBar from './Components/SideBar';
import UserContextProvider from './Context/UserContext';



function App() {
  return (
    <div>
    <UserContextProvider>
      <Header />
      <BrowserRouter>
          <NamaBank />
          <SideBar />
      </BrowserRouter>
    </UserContextProvider>
    </div>
  );
}

export default App;
