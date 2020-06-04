import axios from 'axios';

const baseAuthenticationService = axios.create({
  baseURL: '/api/authentication'
});

const signUp = body => {
  const form = new FormData();
  form.append('name', body.name);
  form.append('email', body.email);
  form.append('password', body.password);
  form.append('photo', body.photo);

  return baseAuthenticationService
    .post('/sign-up', form)
    .then(response => {
      const data = response.data;
      const user = data.user;
      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const signIn = body => {
  return baseAuthenticationService
    .post('/sign-in', body)
    .then(response => {
      const data = response.data;
      const user = data.user;
      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const signOut = () => {
  return baseAuthenticationService
    .post('/sign-out')
    .then(response => {
      return Promise.resolve();
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const loadAuthenticatedUser = () => {
  return baseAuthenticationService
    .get('/me')
    .then(response => {
      const data = response.data;
      const user = data.user;
      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export { signUp, signIn, signOut, loadAuthenticatedUser };
