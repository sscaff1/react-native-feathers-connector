import { Children, PropTypes, Component } from 'react';
import { AsyncStorage } from 'react-native';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';
import io from 'socket.io-client';

export default class FeathersWrapper extends Component {
  static propTypes = {
    children: PropTypes.any,
    wsEndpoint: PropTypes.string,
    loader: PropTypes.any,
    timeout: PropTypes.number,
    reconnectionDelay: PropTypes.number,
    reconnectionDelayMax: PropTypes.number,
  };

  static defaultProps = {
    wsEndpoint: 'http://127.0.0.1:3030',
    reconnection: true,
    loader: null,
    timeout: null,
    reconnectionDelay: 150,
    reconnectionDelayMax: 300,
  };

  static childContextTypes = {
    feathers: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    const options = {
      transports: ['websocket'],
      forceNew: true,
      reconnection: true,
      reconnectionDelay: props.reconnectionDelay,
      reconnectionDelayMax: props.reconnectionDelayMax,
    };
    const socket = io(props.wsEndpoint, options);
    this._initialized = false;
    this._connected = false;
    this._timeout = null;

    this.app = feathers()
    .configure(socketio(socket, { timeout: props.timeout }))
    .configure(hooks())
    .configure(authentication({ storage: AsyncStorage }));
  }

  getChildContext() {
    return { feathers: this.app };
  }

  componentDidMount() {
    if (this.props.timeout) {
      this._addTimeout(this.props.timeout);
    }

    this.app.io.on('connect', () => {
      this._initialized = true;
      this._connected = true;
      this._connectionStatus = 'connected';
      this._clearTimeout();
      this.forceUpdate();
    });
    this.app.io.on('disconnect', () => {
      this._connected = false;
      this._connectionStatus = 'disconnected';
    });
    this.app.io.on('reconnect', () => { this._connectionStatus = 'reconnected'; });
    this.app.io.on('reconnecting', () => { this._connectionStatus = 'reconnecting'; });
    this.app.io.on('reconnect_error', () => { this._connectionStatus = 'reconnect_error'; });
    this.app.io.on('reconnect_failed', () => { this._connectionStatus = 'reconnect_failed'; });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this._clearTimeout();
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
    this.app.io.removeAllListeners();
  }

  _addTimeout = (ms) => {
    if (ms > 0) {
      this._timeout = setTimeout(() => {
        this._initialized = true;
        this._clearTimeout();
        this.forceUpdate();
      }, ms);
    }
  }

  _clearTimeout = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }

  render() {
    const { children, loader } = this.props;

    if (!this._initialized) {
      return loader;
    }

    return Children.only(children);
  }
}
