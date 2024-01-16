export default (state = { programs: [], authData: null }, action) => {
    switch(action.type) {
        case "SET_PROGRAMS":
            return { ...state, programs: action.payload };
        case "CREATE_PROGRAM":
            return { ...state, programs: [action.payload[0], ...state.programs]};
        case "EDIT_PROGRAM":
            return { ...state, programs: [action.payload[0], ...state.programs]};
        case "AUTH": 
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data };
        case "LOGOUT":
            localStorage.clear();
            return { ...state, authData: null };
        default: 
            return state;
    }
}