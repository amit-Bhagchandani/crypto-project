import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getCoins } from "../api"

export const getCoinsThunk = createAsyncThunk('coins/getCoinsThunk', async () => {
    return await getCoins()
})

const coinSlice = createSlice({
    name: 'coins',
    initialState: {
        maxPosPriceChangeCoin_14d: null,
        maxNegPriceChangeCoin_14d: null,
        selectedCoin: null,
        pending: true,
        error: null
    },

    reducers: {
        TOGGLE_COIN : (state,action) => {
            
            const toggledCoin = state.selectedCoin.id == state.maxPosPriceChangeCoin_14d.id ? state.maxNegPriceChangeCoin_14d : state.maxPosPriceChangeCoin_14d
            
            return {
                ...state,
                selectedCoin: toggledCoin
            }
        },
    },

    extraReducers: {
        [getCoinsThunk.pending]: (state, action) => {
            return {
                ...state,
               pending: true,
               error: false
            }
        },

        [getCoinsThunk.fulfilled]: (state, action) => {
            return {
                ...state,
                maxPosPriceChangeCoin_14d: action.payload[0],
                maxNegPriceChangeCoin_14d: action.payload[1],
                selectedCoin: action.payload[0],
                pending: false,
                error: false
            }
        },

        [getCoinsThunk.rejected]: (state, action) => {
            return {
                ...state,
                pending: false,
                error: true
            }
        }
    }
})

export const { TOGGLE_COIN } = coinSlice.actions
export default coinSlice.reducer