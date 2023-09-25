import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProductType } from '../services/types'

interface IProductState {
    products: IProductType | []
}

const initialState: IProductState = {
    products: []
}

export const productSlice = createSlice({
    initialState,
    name: 'productSlice',
    reducers: {
        setProduct: (state, action: PayloadAction<IProductType>) => {
            state.products = action.payload;
        }
    }
})

export default productSlice.reducer;

export const { setProduct } = productSlice.actions;