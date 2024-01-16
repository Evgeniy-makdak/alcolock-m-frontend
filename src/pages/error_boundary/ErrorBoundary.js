import { Component } from 'react';

// TODO => вынести из страниц? - это обертка для страниц => layout?
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ошибка UI</h1>;
    }

    return this.props.children;
  }
}
