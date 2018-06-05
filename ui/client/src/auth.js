export default {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    cb();
  },
  logout(cb) {
    this.isAuthenticated = false
    cb();
  }
}