export default function authService() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
    //   return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      return { 'Authorization': user.token };       // for Node.js Express back-end
    } else {
      return {};
    }
  }