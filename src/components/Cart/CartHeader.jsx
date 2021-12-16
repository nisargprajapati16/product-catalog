import { useMemo } from "react"
import { useSelector } from "react-redux"

const CartHeader = () => {
    const order = useSelector(state => state.order)
    const products = useSelector(state => state.products)

    const items = useMemo(() => {
        return order.map(x => ({ ...x, ...products[x.id] }))
    }, [order, products])

    const total = useMemo(() => {
        return items.reduce((previousValue, currentValue) => previousValue + (+currentValue.price * +currentValue.quantity), 0)
    }, [items])

    return (
        <div className="flex-x align-center justify-space-between header-wrapper">
            <div className="cart-title">Cart Items</div>
            <div className="cart-total">Total: &#8377;{Number(total).toFixed(2)}</div>
        </div>
    )
}

export default CartHeader