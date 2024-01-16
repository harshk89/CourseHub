import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <Container style={{marginTop: '50px'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h4'>Welcome to CourseHub</Typography>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <Typography>
                <Typography component={Link} to="./addProgram">Click here</Typography> to add new Program.
            </Typography>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Typography>
                Or Search for existing courses in the sidebar.
            </Typography>
        </div>
        
    </Container>
  )
}

export default Welcome