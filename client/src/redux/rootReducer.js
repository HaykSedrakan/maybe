import {
    combineReducers
} from "redux";

import langReducer from "./lang/langReducer";

const rootReducer = combineReducers({
    lang: langReducer
})

export default rootReducer