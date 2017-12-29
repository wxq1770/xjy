import React, { PureComponent } from 'react';
import ReactResizeDetector from 'react-resize-detector';

const overflowStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};

export default class AnyVirtualize extends PureComponent {

  static defaultProps = {
    style: {},
    perHeight: 35,
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      scrollIndex: 0,
    };
    this.itemsInView = this.state.height / props.perHeight;
    this.totalHeight = props.children.length * props.perHeight;
  }

  componentDidMount() {
    this.initialScrollbar();
  }

  componentWillReceiveProps(nextProps) {
    this.itemsInView = this.state.height / nextProps.perHeight;
    this.totalHeight = nextProps.children.length * nextProps.perHeight;
    this.initialScrollbar();
    if (nextProps.children.length !== this.props.children.length) {
      this.scrollRef.scrollTop = 0;
    }
  }

  componentWillUnmount() {
    if (this.scrollRef) {
      delete this.itemsInView;
      delete this.totalHeight;
      this.scrollRef.removeEventListener('scroll', this.updateScrollIndex, false);
    }
  }

  initialScrollbar = () => {
    if (this.scrollRef) {
      this.scrollRef.addEventListener('scroll', this.updateScrollIndex, false);
      this.resizeEvent();
    }
  }

  updateScrollIndex = () => {
    const newScrollIndex = Math.ceil(this.scrollRef.scrollTop / this.props.perHeight);
    const difference = Math.abs(this.state.scrollIndex - newScrollIndex);
    if (difference >= 1) {
      this.setState({ scrollIndex: newScrollIndex });
    }
  }

  render() {
    const { scrollIndex } = this.state;
    const { style, className, perHeight, children } = this.props;

    const startPosition = scrollIndex > 0 ? scrollIndex - 1 : 0;
    const top = <div style={{ height: Math.max(0, startPosition * perHeight) }} />;

    const endPosition = scrollIndex >= children.length
      ? children.length
      : (startPosition + this.itemsInView + 1);
    const bottom = <div style={{ height: Math.max(0, this.totalHeight - endPosition * perHeight) }} />;

    return (
      <div
        style={{
          ...overflowStyle,
          ...style,
        }}
        className={className}
        ref={r => this.scrollRef = r}>
        <ReactResizeDetector
          handleHeight
          onResize={this.resizeEvent} />
        {top}
        {children.slice(startPosition, endPosition)}
        {bottom}
      </div>
    );
  }

  resizeEvent = () => {
    if (this.state.resizeEventTimer) {
      clearTimeout(this.state.resizeEventTimer);
      this.setState({
        resizeEventTimer: null,
      });
    }
    if (this.scrollRef) {
      const { height: currentH } = this.scrollRef.getBoundingClientRect();
      const fake = () => {
        if (this.scrollRef) {
          const { height } = this.scrollRef.getBoundingClientRect();
          if (currentH === height) {
            this.itemsInView = Math.ceil(height / this.props.perHeight);
            this.setState({ height });
          }
        }
      };
      this.setState({
        resizeEventTimer: setTimeout(fake, 300),
      });
    }
  }

}
