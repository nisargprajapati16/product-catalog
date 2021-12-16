import { useMemo } from "react"
import { useSelector } from "react-redux"
import Product from "./Product"

const Index = () => {
    const products = useSelector(state => state.products)

    const productsExt = useMemo(() => {
        return Object.keys(products).map(product_key => ({ id: product_key, ...products[product_key] }))
    }, [products])

    return (
        <div className="product-grid flex-y">
            {
                productsExt.map(product => <Product {...product} />)
            }
        </div>
    )
}

export default Index
