import React from 'react';
import Root from './client/components/root/root';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Root/>
    );
  }
}
