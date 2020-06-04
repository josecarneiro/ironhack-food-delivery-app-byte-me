import React, { Component } from 'react';
import { signUp } from './../../../services/authentication';

class AuthenticationSignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      photo: null
    };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = event => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      [name]: file
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { email, name, password, photo } = this.state;

    signUp({ email, name, password, photo })
      .then(user => {
        this.props.updateUser(user);
        // Redirect user to home page after successful sign up
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            name="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label htmlFor="name-input">Full Name</label>
          <input
            id="name-input"
            name="name"
            type="text"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <label htmlFor="photo-input">Profile Photo</label>
          <input
            id="photo-input"
            name="photo"
            type="file"
            placeholder="photo"
            onChange={this.handleFileInputChange}
          />

          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationSignUpView;
