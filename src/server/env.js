require('dotenv').config();

module.exports = {
  "bliss_env": process.env.BLISS_ENV,
  "port": process.env.BLISS_PORT,
  "workspace": process.env.BLISS_WORKSPACE,
  "app": process.env.BLISS_APP,
  "node_modules": process.env.BLISS_NODE_MODULES,
  "npm_path": process.env.NPM_PATH,
  "bliss_user": process.env.BLISS_USER,
  "secret_key": process.env.BLISS_SECRET_KEY
}
