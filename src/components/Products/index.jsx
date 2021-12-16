import { IdcardOutlined, TableOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import { useCallback, useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductTable from "./ProductTable"

const LAYOUT_STYLES = {
    GRID: "grid",
    TABLE: "table"
}

const Index = () => {
    const [layout, setLayout] = useState(LAYOUT_STYLES.GRID)

    const onLayoutChange = useCallback((event) => setLayout(event.target.value), [setLayout]);

    return (
        <div className="products-wrapper">
            <div className="flex-x align-center justify-space-between products-header">
                <div className="title">Products</div>
                <div className="layout-selection">
                <Radio.Group defaultValue={layout} value={layout} buttonStyle="solid" onChange={onLayoutChange}>
                  <Radio.Button value={LAYOUT_STYLES.GRID}><IdcardOutlined /></Radio.Button>
                  <Radio.Button value={LAYOUT_STYLES.TABLE}><TableOutlined /></Radio.Button>
                </Radio.Group>
                </div>
            </div>
            {
                layout === LAYOUT_STYLES.GRID ? <ProductGrid /> : <ProductTable />
            }
        </div>
    )
}

export default Index
