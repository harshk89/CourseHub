import * as api from '../Api';

export const signin = (formData, setError, setLoading, navigate, setUser) => async (dispatch) => {
    try {
        // console.log("signup", formData);
        const response = await api.signin(formData);
        
        const data = response.data;
        // console.log(data);
        setUser(data);
        dispatch({ type: "AUTH", data }); 
        setLoading(false);
        navigate("/programs", {return: true});
    } catch (error) {
        if(error.response.status==400)
            setError("Username and password does not match!");
        else if(error.response.status==404)
            setError("User does not exist!");
        setLoading(false);
        console.log(error);
    }
}

export const signup = (formData, setLoading, navigate, setUser) => async (dispatch) => {
    try {
        // console.log("signup", formData);
        const { data } = await api.signup(formData);

        setUser(data);
        dispatch({ type: "AUTH", data });
        setLoading(false);

        navigate("/programs", {return: true});
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}