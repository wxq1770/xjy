import ClickOutside from 'react-click-outside';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const beaconrootCls = "hst__userguide--beaconroot";

export default class UserGuide extends PureComponent {

  static defaultProps = {
    steps: [],
  };

  componentDidMount() {
    this.renderBeacons(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.renderBeacons(nextProps);
  }

  componentWillUnmount() {
    const { steps } = this.props;

    steps.map(step => {
      const el = document.querySelector(step.selector);
      const beacon = el ? el.querySelector('.hst__userguide--beaconroot') : false;
      if (el && beacon) {
        ReactDOM.unmountComponentAtNode(beacon);
      }
    });
  }

  renderBeacons = ({ steps }) => { // eslint-disable-line
    // console.log(steps);
    steps.map(step => {
      if (window.localStorage.getItem(step.name) === '1') return;

      const el = document.querySelector(step.selector);
      if (el) {
        const hasExist = el.querySelector(`.${beaconrootCls}`);
        if (!hasExist) {
          const div = document.createElement('div');
          div.className = beaconrootCls;
          el.appendChild(div);
          ReactDOM.render(<Beacon
            el={el}
            step={step} />, div);
        }
      }
    });
  }

  render() {
    return null;
  }

}

const positions = {
  'top': {
    top: -6,
    left: -6,
  },
  'left': {
    top: -6,
    left: -6,
  },
  'top-left': {
    top: -6,
    left: -6,
  },
  'top-right': {
    top: -6,
    right: -6,
  },
  'right': {
    top: -6,
    right: -6,
  },
  'bottom': {
    bottom: -6,
    left: -6,
  },
  'bottom-left': {
    bottom: -6,
    left: -6,
  },
  'bottom-right': {
    bottom: -6,
    right: -6,
  },
};

class Beacon extends PureComponent { // eslint-disable-line

  render() {
    const { step: { position, trigger, style }} = this.props;
    const shadowStyle = style || { beacon: {}};
    const propsToBeacon = {
      style: {
        ...positions[position],
        ...shadowStyle.beacon,
      },
    };
    if (trigger === 'hover') {
      propsToBeacon.onMouseEnter = this.onRenderTooltip;
    } else {
      propsToBeacon.onClick = this.onRenderTooltip;
    }

    return <span className="hst__userguide--beacon"
      {...propsToBeacon}>
      <span className="hst__userguide--beacon__inner" />
      <span className="hst__userguide--beacon__outer" />
    </span>;
  }

  onRenderTooltip = () => {
    const { el, step } = this.props;

    if (typeof step.onBeaconTrigger === 'function') step.onBeaconTrigger(el);

    const div = document.createElement('div');
    div.className = "hst__userguide--guideroot";
    document.body.appendChild(div);
    ReactDOM.render(<Guide el={el} step={step} />, div);

    const beaconroot = el.querySelector('.hst__userguide--beaconroot');
    ReactDOM.unmountComponentAtNode(beaconroot);
    beaconroot.remove();
  }

}

class Guide extends PureComponent { // eslint-disable-line

  render() {
    const { el, step: { text, close, position, style }} = this.props;
    const { top, left, width, height } = el.getBoundingClientRect();
    const shadowStyle = style || { hole: {}, tooltip: {}};
    const tooltipStyle = (() => {
      switch (position) {
        case 'top':
        case 'top-left':
          return {
            top,
            left,
            transform: 'translateX(-18px) translateY(calc(-100% - 36px))',
            ...shadowStyle.tooltip,
          };
        case 'left':
          return {
            top,
            left,
            transform: 'translateX(calc(-100% - 36px)) translateY(-18px)',
            ...shadowStyle.tooltip,
          };
        case 'right':
          return {
            top: top - 18,
            left: left + width,
            ...shadowStyle.tooltip,
          };
        case 'top-right':
          return {
            top,
            right: window.innerWidth - left - width,
            transform: 'translateX(18px) translateY(calc(-100% - 36px))',
            ...shadowStyle.tooltip,
          };
        case 'bottom':
        case 'bottom-left':
          return {
            top: top + height,
            left,
            transform: 'translateX(-18px)',
            ...shadowStyle.tooltip,
          };
        case 'bottom-right':
          return {
            top: top + height,
            right: window.innerWidth - left - width,
            transform: 'translateX(18px)',
            ...shadowStyle.tooltip,
          };
      }
    })();

    return <div className="hst__userguide--guide__overlay">
      <ClickOutside onClickOutside={this.unMount}>
        <div className="hst__userguide--guide__hole"
          style={{ top, left, width, height, ...shadowStyle.hole }} />
        <div className="hst__userguide--guide__tooltip"
          style={tooltipStyle}>
          <p
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: text }} />
          <span onClick={this.unMount}>{close}</span>
        </div>
      </ClickOutside>
    </div>;
  }

  unMount = () => { // eslint-disable-line
    const { el, step: { name, onTooltipUnMount }} = this.props;
    const thisEl = document.body.querySelector('.hst__userguide--guideroot');
    if (thisEl) {
      if (typeof onTooltipUnMount === 'function') onTooltipUnMount(el);
      window.localStorage.setItem(name, 1);
      ReactDOM.unmountComponentAtNode(thisEl);
      thisEl.remove();
    }
  }

}
