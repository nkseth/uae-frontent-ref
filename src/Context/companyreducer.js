export const initialState = []
   

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADDDATA':
            console.log(state)
            return action.payload
            case 'ADDITEM':
                
                return [...state,action.payload ]   
        case "REMOVEITEM":
           
            return action.payload
           
        default:
            return state
    }
}