import * as api from '../Api';

export const getAllPrograms = (setDomains, setOpenAlert) => async (dispatch) => {
    try {
        const { data } = await api.getAllPrograms();
        // console.log(data);
        dispatch({ type: "SET_PROGRAMS", payload: data });
        const uniqueDomains = [...new Set(data.map(program => program.Domain))];
        setDomains(currentDomains => {
            return uniqueDomains;
        });
        // console.log("getAllPrograms");
    } catch (error) {
        if(error.response.status==401) {
            setOpenAlert(true);
        }
        console.log(error);
    }
}

export const getProgramsByDomain = (domain, setOpenAlert) => async (dispatch) => {
    try {
        // console.log("reached here!!");
        const { data } = await api.getProgramsByDomain(domain);
        // console.log(data)
        dispatch({ type: "SET_PROGRAMS", payload: data });
    } catch (error) {
        if(error.response.status==401) {
            setOpenAlert(true);
        }
        console.log(error);
    }
}

export const createProgram = (formData, handleClear, setOpenAlert) => async (dispatch) => {
    try {
        const { data } = await api.createProgram(formData);
        console.log(data);
        dispatch({ type: "CREATE_PROGRAM", payload: data });
        handleClear();
    } catch (error) {
        if(error.response.status==401) {
            setOpenAlert(true);
        }
        console.log(error.message);
    }
}

export const editProgram = (formData, setSelectedProgram, setOpenAlert) => async (dispatch) => {
    try {
        // console.log(formData);
        const response = await api.editProgram(formData);
        const program = response.data.program
        setSelectedProgram({...program});
        const { data } = await api.getAllPrograms();
        dispatch({ type: "SET_PROGRAMS", payload: data });
    } catch (error) {
        if(error.response.status==401) {
            setOpenAlert(true);
        }
        console.log(error.message);
    }
}

export const deleteProgram = (Program_id, setSelectedProgram, setOpenAlert) => async (dispatch) => {
    try {
        const response = await api.deleteProgram(Program_id);
        setSelectedProgram(null);
        const { data } = await api.getAllPrograms();
        dispatch({ type: "SET_PROGRAMS", payload: data });
    } catch (error) {
        if(error.response.status==401) {
            setOpenAlert(true);
        }
        console.log(error.message);
    }
}