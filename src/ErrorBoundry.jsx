import { Component } from "react";
import { Result } from "antd";

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra="Try to refresh page"
        />
    }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary
