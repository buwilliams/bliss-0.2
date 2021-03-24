require('dotenv').config();

module.exports = {
  "bliss_env": process.env.BLISS_ENV,
  "port": process.env.BLISS_PORT,
  "port_ssl": process.env.BLISS_PORT_SSL,
  "workspace": process.env.BLISS_WORKSPACE,
  "app": process.env.BLISS_APP,
  "node_modules": process.env.BLISS_NODE_MODULES,
  "bliss_user": process.env.BLISS_USER,
  "bliss_user_ws": process.env.BLISS_USER_WS,
  "secret_key": process.env.BLISS_SECRET_KEY,
  "bliss_test_user": process.env.BLISS_TEST_USER,
  "bliss_test_user_ws": process.env.BLISS_TEST_USER_WS,
  "bliss_ignore_auth": process.env.BLISS_IGNORE_AUTH,
  "bliss_user_email": process.env.BLISS_USER_EMAIL
}
