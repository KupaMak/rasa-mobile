import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./main-slice";



const store = configureStore({
    reducer: {
        main: MainSlice.reducer,
    }

})

export default store;