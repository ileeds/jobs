import _ from 'lodash';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job App', color: '#03A9F4' },
  { text: 'Get a job here', color: '#009688' },
  { text: 'Set your location, then slide away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  componentWillMount() {
    this.props.checkAuth();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.navigation.navigate('map');
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isUndefined(this.props.token)) {
      return <ActivityIndicator />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(WelcomeScreen);
