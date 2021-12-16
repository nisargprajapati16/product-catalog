import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Popover } from 'antd'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Cart from './Cart'
import CardHeader from './Cart/CartHeader'

const Header = () => {
    const [showCart, setShowCart] = useState(false)
    const order = useSelector(state => state.order)
    
    const itemCount = useMemo(() => {
        return order.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    }, [order])

    const onCartClick = () => setShowCart(prevstate => !prevstate)

    return (
        <nav className="header flex-x justify-space-between align-center">
            <div className="title">Product Catalog</div>
            <div className="cart">
                <Popover
                    content={<Cart />}
                    title={<CardHeader />}
                    trigger="click"
                    visible={showCart}
                    onVisibleChange={onCartClick}
                >
                    <Badge size="small" count={itemCount}>
                        <ShoppingCartOutlined />
                    </Badge>
                </Popover>
            </div>
        </nav>
    )
}

export default Header