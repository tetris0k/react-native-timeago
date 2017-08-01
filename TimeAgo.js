import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import moment from 'moment';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

class TimeString extends React.PureComponent {

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { interval } = this.props;
    this.setInterval(this.update, interval);
  }

  componentWillUnmount() {
    this.clearInterval(this.update);
  }

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    this.forceUpdate();
  }

  render() {
    return (
      <Text {...this.props}>{moment(this.props.time).calendar()}</Text>
    );
  }
}

TimeString.propTypes = {
  time: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array,
    React.PropTypes.instanceOf(Date)
  ]).isRequired,
  interval: PropTypes.number,
  hideAgo: PropTypes.bool
};

TimeString.defaultProps = {
  hideAgo: false,
  interval: 60000
};

reactMixin(TimeString.prototype, TimerMixin);

module.exports = TimeString;
