import { PureComponent, PropTypes, createElement } from 'react';

export default function connectFeathers(WrappedComponent) {
  class FeathersConnector extends PureComponent {
    static propTypes = {
      feathers: PropTypes.object,
    };

    static contextTypes = {
      feathers: PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);
      this.feathers = props.feathers || context.feathers;
    }

    getWrappedInstance() {
      return this._ref;
    }

    render() {
      return createElement(WrappedComponent, {
        feathers: this.feathers,
        ...this.props,
        ref: ref => (this._ref = ref),
      });
    }
  }

  return FeathersConnector;
}
