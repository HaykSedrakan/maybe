import {
    SET_LANG
} from "./langActions"


const langReducer = (state = {
    lang: "ARM"
}, {
    type,
    payload
}) => {
    switch (type) {
        case SET_LANG:
            return {
                ...state,
                lang: payload
            }

            default:
                return state
    }
}



export default langReducer