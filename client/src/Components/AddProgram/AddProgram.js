import React, {useState} from 'react'
import { Container, Grid, Typography, TextField, Autocomplete, Checkbox, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Divider, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { createProgram } from '../../Actions/programs';

const AddProgram = ({setOpenAlert}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        Name: "",
        Price: '',
        Domain: "",
        Program_type: "FT",
        Registration_open: true,
        Description: "",
        Placement_assurance: false,
        Image_url: "#",
        University_name: "",
        Faculty_profile: "",
        Learning_hours: '',
        Certificate_diploma: "",
        Eligibility_criteria: "",
    });

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

    const handleClear = () => {
        setFormData({
            Name: "",
            Price: '',
            Domain: "",
            Program_type: "FT",
            Registration_open: true,
            Description: "",
            Placement_assurance: false,
            Image_url: "#",
            University_name: "",
            Faculty_profile: "",
            Learning_hours: '',
            Certificate_diploma: "",
            Eligibility_criteria: ""
        })
    }   

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProgram(formData, handleClear, setOpenAlert));
    }

  return (
    <form onSubmit={handleSubmit}>
        <Container style={{marginTop: '15px'}}>
            <div>
                <Typography variant='h4' sx={{fontWeight: '600'}}>Add Program</Typography>
                <Typography variant='body2'><span style={{color: 'red'}}>*</span>Required to save as Program.</Typography>
            </div>
            <div>
                <Typography variant='h5' sx={{fontWeight: '600', marginTop: '15px', marginBottom: '5px'}}>Confirm Program</Typography>
                <Grid container alignItems='stretch' spacing={2}>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Price</Typography>
                        <TextField
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
                            disablePortal
                            options={domains}
                            fullWidth
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder='Domain' required />}
                            onChange={(event, newValue)=>setFormData({...formData, Domain: newValue ? newValue.label : '' })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <FormControlLabel
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
                        <FormControl>
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
                        <FormControl>
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
                            disablePortal
                            options={Universities}
                            fullWidth
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder='University' required />}
                            onChange={(event, newValue)=>setFormData({...formData, University_name: newValue ? newValue.label : '' })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Certificate/Diploma</Typography>
                        <Autocomplete
                            disablePortal
                            options={[{label: "Certificate"}, {label: "Diploma"}]}
                            fullWidth
                            size="small"
                            renderInput={(params) => <TextField {...params} required/>}
                            onChange={(event, newValue)=>setFormData({...formData, Certificate_diploma: newValue ? newValue.label : '' })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Faculty Profile</Typography>
                        <TextField required fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Faculty_profile: e.target.value})} value={formData.Faculty_profile} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Learning Hours</Typography>
                        <TextField
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
                        <TextField required fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Eligibility_criteria: e.target.value})} value={formData.Eligibility_criteria} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                        <Typography variant='body2' style={{marginBottom: '2px'}}><span style={{color: 'red'}}>*</span>Image URL</Typography>
                        <TextField required fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Image_url: e.target.value})} value={formData.Image_url} size="small" />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Typography variant='body2' style={{marginBottom: '2px', marginTop: '20px'}}><span style={{color: 'red'}}>*</span>Description</Typography>
                <TextField required multiline rows={2} fullWidth variant="outlined" onChange={(e)=>setFormData({...formData, Description: e.target.value})} value={formData.Description} />
            </div>
            <div>

            </div>
        </Container>
        {/* <Divider style={{marginTop: "15px"}}/> */}
        <div style={{display: 'flex', justifyContent: 'space-between', marginRight: '20px', marginLeft: '20px', marginTop: '20px'}}>
            <Button variant='outlined' onClick={handleClear}>Clear</Button>
            <Button variant='contained' type="submit">Create Program</Button>
        </div>
    </form>
  )
}

export default AddProgram