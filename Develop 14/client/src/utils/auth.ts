import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false; // If no expiration time, assume valid
      return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
    } catch (error) {
      return true; // Assume expired if decoding fails
    }
  }

  getToken(): string | null {
    // TODO: return the token
    return localStorage.getItem("token");
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem("token", idToken);
    window.location.href = "/"; 
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  }
}

export default new AuthService();
