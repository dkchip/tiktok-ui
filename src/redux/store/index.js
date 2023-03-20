import {createStore} from "redux"
import loginReducer from "../reducers/loginReducer";

const store = createStore(loginReducer)
export default store;