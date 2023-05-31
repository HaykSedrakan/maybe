import {
    combineReducers
} from "redux";

import langReducer from "./lang/langReducer";
import categoryReducer from "./category/categoryReducer";

const rootReducer = combineReducers({
    lang: langReducer,
    category: categoryReducer
})

export default rootReducer