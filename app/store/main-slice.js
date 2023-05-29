import { createSlice } from "@reduxjs/toolkit";

const MainSlice = createSlice({
    name: "main",
    initialState: {
        products: [],
        category: [],
        isLoaded: false,
        selected: 'All',
        count: 1,
        categoryLoaded: false,
        cartItems: [],
        cartItemsNumber: 0,
        store: [],
        storeItemsNumber: 0,
        isLogged: false,
        message: null,
        openDialog: false,
        storeLoaded: false,





    },
    reducers: {

        setProducts(state, { payload }) {
            state.products = payload
        },
        setIsLoaded(state, { payload }) {
            state.isLoaded = payload
        },
        setCategory(state, { payload }) {
            state.category = payload
        },
        setSelected(state, { payload }) {
            state.selected = payload
        },
        setCount(state, { payload }) {
            state.count = payload
        },
        setCategoryLoaded(state, { payload }) {
            state.categoryLoaded = payload
        },
        setCart(state, { payload }) {
            state.cartItems = payload
        },
        setCartItemsNumber(state, { payload }) {
            state.cartItemsNumber = payload
        },
        setStore(state, { payload }) {
            state.store = payload
        },
        setStoreItemsNumber(state, { payload }) {
            state.storeItemsNumber = payload
        },
        setIsLogged(state, { payload }) {
            state.isLogged = payload
        },
        setMessage(state, { payload }) {
            state.message = payload
        },
        setOpenDialog(state, { payload }) {
            state.openDialog = payload
        },
        setStoreLoaded(state, { payload }) {
            state.storeLoaded = payload
        }


    }

})

export const MainAction = MainSlice.actions;

export default MainSlice;