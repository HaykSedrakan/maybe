import {
    SET_CATEGORY
} from "./categoryActions"

const categoryReducer = (state = {
    category: 'All'
}, {
    type,
    payload
}) => {
    switch (type) {
        case SET_CATEGORY:
            return {
                ...state,
                category: payload
            }

            default:
                return state
    }
}



export default categoryReducer