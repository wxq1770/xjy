import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import React, { PureComponent } from 'react';
import Carousel from 'react-3d-carousel';
import $ from 'jquery';
import AlloyFinger from './AlloyFinger';
import toJS from '../../libs/toJS';
import './index.less';
import 'react-3d-carousel/static/style.css';
import images from './images.js';

class Guide extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      images: images.slice(0, 6),
      width: 400,
      layout: 'prism',
      ease: 'linear',
      duration: 400,
      videoStatus:false,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
    $('.carousel img').click((e)=>{
      if(e.target.src == 'http://www.minigene.net/assets/img/banner_3.png'){
        this.renderContent('/details');
      }
    });
  }

  renderContent = page => {
    this.props.router.push(page);
  }

  buy = ()=>{
    window.scrollTo(0,0);
    this.props.router.push('/buyproduct');
  }

  Swipe = (evt) => {
    if(evt.direction === 'Left'){
      $(".next")[0].click();
    }else if(evt.direction === 'Right'){
      $(".prev")[0].click();
    }
  }

  render() {

    return (
      <div className="Guide">
        <div className='guide_header'>
          <h2 className="guide_header_title">新手必看</h2>
          <div className="header-shang"></div>
          <div className="header-xia"></div>
          <AlloyFinger onSwipe={this.Swipe}><div>
            <Carousel width={this.state.width}
                    images={this.state.images}
                    ease={this.state.ease}
                    duration={this.state.duration}
                    layout={this.state.layout} />
          </div></AlloyFinger>
        </div>
        <div className="guide_1"></div>
        <div className="guide_2"></div>
        <div className="guide_3"></div>
        <div className="guide_4"></div>
        <div className="guide_video"></div>
        <div className="guide_video_1">
          <div className='r5-wraper'>
            <video
              controls="true"
              preload="auto"
              webkit-playsinline="true"
              playsinline="true"
              x-webkit-airplay="allow"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              x5-video-orientation="portraint"
              style={{objectFit:'fill'}}
              poster="http://www.minigene.net/assets/img/guide_video_bj_1.png"
              src="http://www.minigene.net/assets/shpin.mp4">
            </video>
          </div>
          <h2>基因是怎样检测出来的</h2>
          <div className='r5-wraper'>
            <video
              controls="true"
              preload="auto"
              webkit-playsinline="true"
              playsinline="true"
              x-webkit-airplay="allow"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              x5-video-orientation="portraint"
              style={{objectFit:'fill'}}
              poster="http://www.minigene.net/assets/img/zhaoli.jpg"
              src="http://www.minigene.net/assets/shipin1.mp4">
            </video>
          </div>
          <h2>如何优雅的采样</h2>
        </div>
        <div className="guide_5"></div>
        <div className="guide_6"></div>
        <div className="guide_7"></div>
        <div className="guide_8"></div>
        <div className="footer">
          <p>【原价99元，首发优惠只需59元】</p>
          <span onClick={this.buy}>立即购买</span>
        </div>
      </div>
    );
  }
}

export default translate()(connect((state, ownProps) => ({
  children: ownProps.children,
}), () => ({
  actions: {
  },
}))(toJS(Guide)));
