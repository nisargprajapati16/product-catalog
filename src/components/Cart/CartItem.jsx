import { InputNumber, message } from "antd"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateCart } from "../../feature/order/orderSlice"

const CartItem = ({ name, price, id }) => {
    const dispatch = useDispatch()
    const inventories = useSelector(state => state.inventory)
    const order = useSelector(state => state.order)

    const stockCount = useMemo(() => {
        return Number(inventories[id]?.in_stock_count || 0)
    }, [inventories])

    const orderQuantity = useMemo(() => {
        return order.find(x => x.id === id)?.quantity || 0
    }, [order])

    const onCounterChange = quantity => {
        if (stockCount >= quantity) {
            dispatch(updateCart({ id, quantity }))
        } else {
            message.error("Can't add items more than available")
        }
    }

    return (
        <div className="flex-x justify-space-between align-center cart-item">
            <div>
                <span className="cart-item-name">{name}</span> <br />
                <span className="cart-item-price">Price: &#8377; {price}</span>
            </div>
            <InputNumber className="cart-item-counter" min={0} max={2} disabled={!stockCount} value={orderQuantity} defaultValue={0} onChange={onCounterChange} />
        </div>
    )
}

export default CartItem