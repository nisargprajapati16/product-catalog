import 'antd/dist/antd.css'
import Header from './components/Header'
import Products from './components/Products'
import ErrorBoundry from './ErrorBoundry'

const App = () => {
  return (
    <ErrorBoundry>
      <Header />
      <Products />
    </ErrorBoundry>
  )
}

export default App
