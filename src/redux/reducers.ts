import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import account from "@redux/slices/account";

const rootReducer = combineReducers({ counter, account });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
