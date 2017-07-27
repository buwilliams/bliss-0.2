require('dotenv').config();

module.exports = {
  "user": {
    "username": process.env.BLISS_USER,
    "workspace": process.env.BLISS_USER_WS
  }
}
