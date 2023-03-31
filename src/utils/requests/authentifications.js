export async function signUpWithEmailAndPassword(email, username, password) {
  return new Promise((resolve, reject) => {
    resolve({
      id: 1,
      email: email,
      username: username,
      avatar: null,
    });
  });
}
