import React, { PureComponent } from 'react';
import './index.less';

class Header extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
  }

  render() {
    return (
      <div className="header">
        
      </div>
    );
  }

}

export default Header;
