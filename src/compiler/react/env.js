require('dotenv').config();

module.exports = {
  "port": process.env.BLISS_PORT,
  "workspace": process.env.BLISS_WORKSPACE,
  "app": process.env.BLISS_APP,
  "node_modules": process.env.BLISS_NODE_MODULES,
  "npm_path": process.env.NPM_PATH
}