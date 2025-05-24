const userDB = {
  email: 'user@example.com',
  password: '123456',
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === userDB.email && password === userDB.password) {
        resolve({ email });
      } else {
        reject('Email o contraseña incorrectos');
      }
    }, 500);
  });
};

export const register = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ email });
    }, 500);
  });
};
