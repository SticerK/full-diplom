import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Product = {
  title: string;
  price: number;
  url: string;
  id: number;
  shDescr?: string;
  descr: string;
  peculiarities?: string[];
  items?: number;
};

type BasketSlice = {
  products: Product[];
};

const initialState: BasketSlice = {
  products: [],
};

const basket = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    changeBasket(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },

    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    changeItems(state, action: PayloadAction<{ id: number; items: number }>) {
      state.products = state.products.filter((product) => {
        if (product.id === action.payload.id) product.items = action.payload.items;

        return product;
      });
    },
    clearBasket(state) {
      state.products = [];
    },
  },
});

export default basket.reducer;
export const { changeBasket, deleteProduct, changeItems, clearBasket } = basket.actions;
