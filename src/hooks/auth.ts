import jwt_decode from 'jwt-decode';

const checkAuth = () => {
  const isTokenExist = localStorage.token;
  
  if (!isTokenExist) {
    return false;
  }
  console.log();
  
  const decoded: {
    email: string;
    _id: string;
    iat: number;
    exp: number;
  } = jwt_decode(localStorage.token);
  const isTokenExpired = decoded.exp < (Date.now() / 1000);
  if (isTokenExpired) {
    return false;
  }
  
  return decoded._id;
};

export default checkAuth;
