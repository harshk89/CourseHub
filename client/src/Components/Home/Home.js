import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Typography, Button, TextField, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPrograms, getProgramsByDomain } from '../../Actions/programs';
import AddProgram from '../AddProgram/AddProgram';
import EditProgram from '../EditProgram/EditProgram';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Home = ({selectedProgram, setSelectedProgram}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const programs = useSelector((state) => state.programs);
  const [search, setSearch] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [domains, setDomains] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  const Card = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#d1e8ff',
    },
    minHeight: '60px',
    alignItems: 'center',
    paddingLeft: '5px',
    paddingTop: '10px',
    borderRadius: '5px'
  }));

  useEffect(() => {
    if(selectedDomain==="All")
      dispatch(getAllPrograms(setDomains, setOpenAlert));
    else
      dispatch(getProgramsByDomain(selectedDomain, setOpenAlert));  
    return () => {
    }
  }, [selectedDomain])

  useEffect(() => {
    const filtered = programs.filter(program => program.Name.toLowerCase().includes(search.toLowerCase()));
    setFilteredPrograms(filtered);
    return () => {
    }
  }, [search, programs])
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleCardClick = (program) => {
    setSelectedProgram({...program})
  }

  const handleCloseAlert = () => {
    navigate('/');
    localStorage.clear();
;    setOpenAlert(false);
  }

  const formatDate = (lastModified) => {
    const date = new Date(lastModified);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const btnStyles = {
    backgroundColor: '#3579d2',
    height: '44px',
    minWidth: '44px',
    borderRadius: '22px',
    ':hover': {
      backgroundColor: "#306ab6"
    }
  }
  return (
    <Container style={{display: 'flex', maxWidth: '100%', padding: '0px', minHeight: '90vh'}}>
      <Container style={{width: "25%", maxHeight: '700px', overflowY: 'scroll', borderRight: '1px solid #b9b9b9'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center'}}>
          <div>
            <Typography variant="h5" sx={{fontWeight: 700, }}>Programs</Typography>
            <Typography variant='body1' sx={{fontSize: '0.9rem'}}>{programs.length} programs</Typography>
          </div>
          <Button sx={btnStyles} onClick={()=>setSelectedProgram(null)}><AddIcon sx={{color: 'white'}}/></Button>
        </div>
        <TextField value={search} onChange={handleSearch} style={{marginTop: '20px'}} fullWidth label="Search" variant="outlined" />
        <div style={{display: 'flex', paddingTop: "10px", flexWrap: 'wrap'}}>
          <Button onClick={()=>setSelectedDomain("All")} style={{border: '1px solid #b9b9b9', marginLeft: "4px", marginBottom: "6px", fontSize: '0.8rem', borderRadius: '20px', minWidth: '50px', fontWeight: '600'}}>All</Button>
          {domains.map((domain) => (
            <Button onClick={()=>setSelectedDomain(domain)} style={{border: '1px solid #b9b9b9', marginLeft: "4px", marginBottom: "6px", fontSize: '0.8rem', borderRadius: '20px', minWidth: '50px', fontWeight: '600'}}>{domain}</Button>
          ))}
        </div>
        <div style={{marginTop: '10px'}}>
          {filteredPrograms.map((program) => (
            <>
            <Card onClick={()=>handleCardClick(program)} key={program.Program_id}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{program.Name[0]}</Avatar>
                <div style={{marginLeft: '10px'}}>
                  <Typography>{program.Name}</Typography>
                  <Typography>Last Modified {formatDate(program.Last_modified)}</Typography>
                </div>
              </div>
            </Card>
            <Divider />
            </>
          ))}
        </div>
      </Container>

      <div style={{width: "75%"}}>
        {selectedProgram===null?(
          <AddProgram setOpenAlert={setOpenAlert}/>):(
          <EditProgram setOpenAlert={setOpenAlert} selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram}/>
        )}
      </div>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Unauthorized!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please Login to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Home