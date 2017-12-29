import React from 'react';
import classNames from 'classnames';
import './index.less';

export default function Loading({ spin, children, className, style }) {
  return <div className={classNames(
      className,
      "loading_wrap",
    )}
    style={{
      ...style,
    }}>
    <div className={classNames({
      "loading loading__spinner": true,
      "loading--hidden": !spin,
    })} />
    <div className={classNames({
      "loading__blur": true,
      "loading__blur--active": spin,
    })}>
      {children}
    </div>
  </div>;
}
