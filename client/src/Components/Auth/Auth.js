import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { signin, signup } from '../../Actions/auth.js';
// import Input from './Input'

const initialState = {name: '', email: '', password: ''};

const Auth = ({ user, setUser }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('none');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
        setError("none");
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            setLoading(true);
            dispatch(signup(formData, setLoading, navigate, setUser));
        } else {
            setLoading(true);
            dispatch(signin(formData, setError, setLoading, navigate, setUser));
        }
      }
    
    const paperStyles = {
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f9f9f9'
    }
    
  return (
    <Container component="main" maxWidth="xs" style={{minHeight: '80vh'}}>
        <Paper style={paperStyles} elevation={3}>
            <Typography variant='h5' fontWeight={700}>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form style={{width: '100%', marginTop: '24px'}} onSubmit={handleSubmit}>
              {
                isSignup && (
                  <TextField
                    required
                    label="Name"
                    name="name"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    style={{marginBottom: "10px"}}
                  />
                )
              }
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleChange}
                style={{marginBottom: "10px"}}
              />
              {error==="none"?(
                <TextField
                  required
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  style={{marginBottom: "10px"}}
                />
                ):(
                  <TextField
                  error
                  helperText={error}
                  required
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  style={{marginBottom: "10px"}}
                />
                )}

              <LoadingButton size="large" type="submit" fullWidth loading={loading} variant="contained" style={{marginTop: "15px"}}>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </LoadingButton>

              <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
                {isSignup ? (
                    <Typography variant='body1'>Already have an account? <a onClick={switchMode} style={{color: 'blue'}}>Login</a></Typography>):(
                        <Typography variant='body1'>Dont't have an account? <a onClick={switchMode} style={{color: 'blue'}}>Signup</a></Typography>
                    )
                }
              </div>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth