import React, { Component } from 'react';

class ErrorView extends Component {
  render() {
    const code = this.props.match.params.code;

    let message;
    switch (code) {
      case '404':
        message = 'Page not found';
        break;
      case '401':
        message = 'Not authorized';
        break;
      default:
        message = 'Unknown error';
    }

    return (
      <div>
        <h1>There was an error.</h1>
        <p>{message}</p>
      </div>
    );
  }
}

export default ErrorView;
