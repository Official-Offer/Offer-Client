import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import account from "@redux/slices/account";
import jobs from "@redux/slices/jobs";

const rootReducer = combineReducers({ counter, account, jobs });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
