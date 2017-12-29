import React, { PureComponent } from 'react';

export default class ImgLoader extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.hash = +new Date();
  }

  componentDidMount() {
    // force make browser refresh image
    this.hash = +new Date();

    const { src, onload } = this.props;
    const img = new Image();
    img.src = `${src}#${this.hash}`;
    img.onload = () => {
      console.debug(`%cLoading Image ${src}#${this.hash} success`, 'color: #bada55');
      this.setState({ loading: false }, () => {
        if (typeof onload === 'function') onload();
      });
    };
    img.onerror = () => {
      console.debug(`%cLoading Image ${src}#${this.hash} failure`, 'color: red');
    };
  }

  render() {
    const { placeholder, src, style: propStyles } = this.props;
    const { loading } = this.state;
    const style = {
      transition: `filter .4s ease`,
      ...propStyles,
    };
    if (loading) {
      style.filter = `blur(5px)`;
      if (typeof placeholder !== 'string') {
        return placeholder;
      }
    }
    return <img
      src={loading ? placeholder : `${src}#${this.hash}`}
      style={style} />;
  }

}
