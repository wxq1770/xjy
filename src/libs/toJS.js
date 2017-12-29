import React from 'react';
import { Iterable } from 'immutable';

const toJS = WrappedComponent => {
  const Component = wrappedComponentProps => {
    const KEY = 0;
    const VALUE = 1;
    const propsJS = Object.entries(wrappedComponentProps)
      .reduce((newProps, wrappedComponentProp) => {
        newProps[wrappedComponentProp[KEY]] =
          Iterable.isIterable(wrappedComponentProp[VALUE])
            ? wrappedComponentProp[VALUE].toJS()
            : wrappedComponentProp[VALUE];
        return newProps;
      }, {});

    return <WrappedComponent {...propsJS} />
  };
  Component.displayName = 'ToJS';
  return Component;
};

export default toJS;
