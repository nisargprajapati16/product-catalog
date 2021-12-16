import { InputNumber, message } from "antd"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { updateCart } from "../../../feature/order/orderSlice";

const Product = ({ name, description, price, image, id }) => {
    const dispatch = useDispatch();
    const inventories = useSelector(state => state.inventory)
    const order = useSelector(state => state.order)

    const orderQuantity = useMemo(() => {
        return order.find(x => x.id === id)?.quantity || 0
    }, [order])

    const stockCount = useMemo(() => {
        return Number(inventories[id]?.in_stock_count || 0)
    }, [inventories])

    const stockStatus = useMemo(() => {
        if (stockCount > 0 && stockCount <= 2) {
            return <span className="status-1">Running out of stock</span>
        } else if (stockCount > 2) {
            return <span className="status-2">Available</span>
        } 
            
        return <span className="status-3">Out of stock</span>
    }, [inventories])

    const onCounterChange = quantity => {
        if (stockCount >= quantity) {
            dispatch(updateCart({ id, quantity }))
        } else {
            message.error("Can't add items more than available")
        }
    }

    return (
        <div className="product-card flex-x align-center">
            <img src={image} alt={id} />
            <div className="information flex-y justify-space-between">
                <div>
                    <div className="title">{name}</div>
                    <div className="description">{description}</div>
                </div>
                {stockStatus}
                <div className="price">&#8377; {Number(price).toFixed(2)}</div>
            </div>
            <div className="action flex-y">
                <InputNumber min={0} max={2} disabled={!stockCount} value={orderQuantity} defaultValue={0} onChange={onCounterChange} />
            </div>
        </div>
    )
}

export default Product