require('dotenv').config();

module.exports = {
  "user": {
    "username": process.env.BLISS_TEST_USER,
    "workspace": process.env.BLISS_TEST_USER_WS
  }
}
