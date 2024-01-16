import React, {useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Auth from './Components/Auth/Auth';

const App = () => {

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const containerStyles = {
    backgroundColor: "white",
    maxWidth: "100vw",
    margin: '0px',
    padding: '0px'
  }
  return (
    <>
      <BrowserRouter >
        <Container style={containerStyles}>
          <Navbar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/" element={<Auth user={user} setUser={setUser}/>} />
            <Route path="/programs" element={!user ? <Navigate to="/" /> : <Home selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram}/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App;