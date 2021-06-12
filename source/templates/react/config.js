export default function configGenerator (_) {
  return `
const dev = {};

const staging = {};

const prod = {};

const isProd = process.env.REACT_APP_CONFIG_ENV==='production'
const isStaging = process.env.REACT_APP_CONFIG_ENV==='staging'
const isDev = !isProd && !isStaging;


let config;

config = isProd && prod;
config = isStaging && staging;
config = isDev && dev;

module.exports = config;
  `
}
