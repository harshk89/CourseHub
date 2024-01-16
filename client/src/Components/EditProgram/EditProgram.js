import React, {useEffect, useState} from 'react'
import { Container, Grid, Typography, TextField, Autocomplete, Checkbox, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Divider, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { editProgram, deleteProgram } from '../../Actions/programs';

const EditProgram = ({setOpenAlert, selectedProgram, setSelectedProgram}) => {

    const dispatch = useDispatch();

    const [editEnabled, setEditEnabled] = useState(false);

    const [formData, setFormData] = useState({...selectedProgram});
    useEffect(() => {
      setFormData({...selectedProgram});
    
      return () => {
      }
    }, [selectedProgram])
    
    const id = selectedProgram.Program_id;

    const domains = [
        { label: 'Data' },
        { label: 'Finance' },
        { label: 'WebDev' },
        { label: 'AppDev' },
        { label: 'Future Tech' },
        { label: 'Cybersecurity' },
        { label: 'Data Science' },
        { label: 'Cloud Computing' },
        { label: 'Robotics' },
        { label: 'Business Analytics' },
        { label: 'AI' },
    ]

    const Universities = [
        { label: 'LNMIIT Jaipur' },
        { label: 'MNIT Jaipur' },
        { label: 'IIT Mumbai' },
        { label: 'IIT Roorkee' },
        { label: 'IIT Kanpur' },
        { label: 'NSUT Delhi' },
        { label: 'IIIT Hyderabad' },
    ]

    const handleDelete = () => {
        // console.log("formData: ", formData)
        dispatch(deleteProgram(formData.Program_id, setSelectedProgram, setOpenAlert));
    }   

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(editProgram({...formData, Program_id: id}, setSelectedProgram, setOpenAlert));
    }

  return (
    <form onSubmit={handleEdit}>
        <Container style={{marginTop: '15px'}}>
            <div>
                <Typography variant='h4' sx={{fontWeight: '600'}}>Edit Program</Typography>
                <Typography variant='body2'><span style={{color: 'red'}}>*</span>Required to save as Program.</Typography>
            </div>
            <div>
                <Typography variant='h5' sx={{fontWeight: '600', marginTop: '15px', marginBottom: '5px'}}>Confirm Program</Typography>
                <Grid container alignItems='stretch' spacing={2}>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Price</Typography>
                        <TextField
                            disabled={!editEnabled}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            size="small"
                            value={formData.Price}
                            placeholder='INR'
                            onChange={(e)=>setFormData({...formData, Price: e.target.value})}
                            helperText="You are licenced to sell on this price"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Domain</Typography>
                        <Autocomplete
                            disabled={!editEnabled}
                            disablePortal
                            options={domains}
                            fullWidth
                            size="small"
                            value={formData.Domain}
                            renderInput={(params) => <TextField {...params} placeholder="Domain" required/>}
                            onChange={(event, newValue)=>setFormData({...formData, Domain: newValue ? newValue.label : '' })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <FormControlLabel
                            disabled={!editEnabled}
                            style={{marginTop: '20px'}}
                            label="Placement Assurance"
                            control={<Checkbox 
                                checked={formData.Placement_assurance}
                                onChange={(e)=>setFormData({...formData, Placement_assurance: e.target.checked})}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />}
                        />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Typography variant='h5' sx={{fontWeight: '600', marginTop: '10px', marginBottom: '5px'}}>Information</Typography>
                <Grid container alignItems='stretch' spacing={2}>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Name</Typography>
                        <TextField
                            disabled={!editEnabled}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            size="small"
                            value={formData.Name}
                            onChange={(e)=>setFormData({...formData, Name: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <FormControl disabled={!editEnabled}>
                            <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Program Type</Typography>
                            <RadioGroup
                                row
                                value={formData.Program_type}
                                onChange={(e)=>setFormData({...formData, Program_type: e.target.value})}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 20,
                                    },
                                }}
                                required
                            >
                                <FormControlLabel value="FT" control={<Radio />} label="FT" />
                                <FormControlLabel value="PT" control={<Radio />} label="PT" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <FormControl disabled={!editEnabled}>
                            <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Registration Open</Typography>
                            <RadioGroup
                                row
                                value={formData.Registration_open}
                                onChange={(e)=>setFormData({...formData, Registration_open: e.target.value})}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 20,
                                    },
                                }}
                                required
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>University Name</Typography>
                        <Autocomplete
                            disabled={!editEnabled}
                            disablePortal
                            options={Universities}
                            fullWidth
                            value={formData.University_name}
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder='University' required />}
                            onChange={(event, newValue)=>setFormData({...formData, University_name: newValue ? newValue.label : '' })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Certificate/Diploma</Typography>
                        <Autocomplete
                            disabled={!editEnabled}
                            disablePortal
                            options={[{label: "Certificate"}, {label: "Diploma"}]}
                            fullWidth
                            value={formData.Certificate_diploma}
                            size="small"
                            renderInput={(params) => <TextField {...params} required/>}
                            onChange={(event, newValue)=>setFormData({...formData, Certificate_diploma: newValue ? newValue.label : '' })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Faculty Profile</Typography>
                        <TextField disabled={!editEnabled} required fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Faculty_profile: e.target.value})} value={formData.Faculty_profile} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Learning Hours</Typography>
                        <TextField
                            disabled={!editEnabled}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            size="small"
                            value={formData.Learning_hours}
                            onChange={(e)=>setFormData({...formData, Learning_hours: e.target.value})}
                            placeholder='0'
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Eligibility Criteria</Typography>
                        <TextField disabled={!editEnabled} required fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Eligibility_criteria: e.target.value})} value={formData.Eligibility_criteria} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Image URL</Typography>
                        <TextField disabled={!editEnabled} required fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Image_url: e.target.value})} value={formData.Image_url} size="small" />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Typography variant='body2' style={{marginBottom: '2px', marginTop: '20px'}}><span style={{color: 'red'}}>*</span>Description</Typography>
                <TextField disabled={!editEnabled} required multiline rows={2} fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Description: e.target.value})} value={formData.Description} />
            </div>
            <div>

            </div>
        </Container>
        {/* <Divider style={{marginTop: "15px"}}/> */}
        <div style={{display: 'flex', justifyContent: 'space-between', marginRight: '20px', marginLeft: '20px', marginTop: '20px'}}>
            <Button variant='outlined' color="error" onClick={handleDelete}>Delete</Button>
            <div>
                <Button variant='contained' onClick={()=>setEditEnabled(!editEnabled)}>{editEnabled?'Disable':'Enable'} Edit</Button>
                <Button disabled={!editEnabled} variant='contained' type="submit" style={{marginLeft: '10px'}}>Submit</Button>
            </div>
        </div>
    </form>
  )
}

export default EditProgram