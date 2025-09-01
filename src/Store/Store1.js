import {create} from "zustand"
const useProductStore = create((set) =>({
    products: [],
    product: null,
    cart: [],
    fetchProducts: async () => {
        try {
            const res = await fetch("https://fakestoreapi.com/products")
            const data = await res.json()
            set({products: data, product: null});
            console.log(data)
        } catch (err) {
            console.error("Error fetching products",err)
        }
    },
    fetchProductById: async (id) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await res.json()
            set({product: data});
            console.log(data)
        } catch (err) {
            console.error("Error fetching product",err)
        }
    },
    addToCart: (item) =>
        set((state) => {
            const existing = state.cart.find((c) => c.id === item.id)
            if (existing) {
                return {
                    cart: state.cart.map((c) =>
                        c.id === item.id ? {...c, qty: c.qty + 1} : c
                    ),
                };
            }
            return {
                cart: [...state.cart, {...item, qty: 1}]
            }
        }),

    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        })),

}))
export { useProductStore };