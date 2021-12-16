import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux"
import { InputNumber, message, Table } from 'antd';
import { useDispatch } from "react-redux";
import { updateCart } from "../../../feature/order/orderSlice";

const Index = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const inventories = useSelector(state => state.inventory)
    const order = useSelector(state => state.order)
    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'image',
            key: 'image',
            render: (image, product) => <img className="table-product-image" src={image} alt={product.id} />,
            width: 100
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 500
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (price, product) => <div>{stockStatus(product.id)}<div className="table-price">&#8377; {price}</div></div>,
            width: 100
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: id => <InputNumber min={0} max={2} disabled={!stockCount(id)} value={orderQuantity(id)} defaultValue={0} onChange={val => onCounterChange(val, id)} />,
            width: 100
        }
    ];

    const stockCount = useCallback(id => {
        return Number(inventories[id]?.in_stock_count || 0)
    }, [inventories])

    const orderQuantity = useCallback(id => {
        return order.find(x => x.id === id)?.quantity || 0
    }, [order])

    const onCounterChange = (quantity, id) => {
        if (stockCount(id) >= quantity) {
            dispatch(updateCart({ id, quantity }))
        } else {
            message.error("Can't add items more than available")
        }
    }

    const stockStatus = useCallback(id => {
        if (stockCount(id) > 0 && stockCount(id) <= 2) {
            return <span className="status-1">Running out of stock</span>
        } else if (stockCount(id) > 2) {
            return <span className="status-2">Available</span>
        } 
            
        return <span className="status-3">Out of stock</span>
    }, [inventories])

    const productsExt = useMemo(() => {
        return Object.keys(products).map(product_key => ({ id: product_key, ...products[product_key] }))
    }, [products])

    return (
        <Table dataSource={productsExt} columns={columns} />
    )
}

export default Index
