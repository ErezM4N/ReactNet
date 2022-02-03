import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";
import { getCookie } from "../../app/util/util";

interface BasketState {
    basket: Basket | null,
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}


export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => { // if cond. true >>>
        debugger
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });

        }
    },
    {
        condition: () => {
            //if (!localStorage.getItem('user')) return false;
            if (!getCookie('buyerId')) return false;
        }
    }
)


// First, create the thunk
export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
    'basket/addBasketItemAsync',
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity: number, name?: string }>(
    'basket/removeBasketItemAsync',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            await agent.Basket.removeItem(productId, quantity)
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

// Then, handle actions in your reducers:
export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    // standard reducer logic, with auto-generated action types per reducer
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
    },
    extraReducers: (builder => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });



        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });

        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg; // quantity = undefined
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });

        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });


        //builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });

        //builder.addCase(addBasketItemAsync.rejected, (state, action) => {
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected,fetchBasketAsync.fulfilled), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})


export const { setBasket } = basketSlice.actions;