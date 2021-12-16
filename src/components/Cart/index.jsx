import { Empty } from "antd"
import { Fragment, useMemo } from "react"
import { useSelector } from "react-redux"
import CartItem from "./CartItem"

const Index = () => {
    const order = useSelector(state => state.order)
    const products = useSelector(state => state.products)

    const items = useMemo(() => {
        return order.map(x => ({ ...x, ...products[x.id] }))
    }, [order, products])

    return (
        <Fragment>
            {
                items && items.length ? items.map(item => <CartItem {...item} />) : <Empty />
            }    
        </Fragment>
    )
}

export default Index