const code = `import VersionInfo from 'react-native-version-info'

const dev = {};

const prod = {};

let config;

if(VersionInfo.bundleIdentifier && VersionInfo.bundleIdentifier.include('.dev')){
  config = dev
}else{
  config = prod
}

export default config
  `;

export default function configGenerator(_) {
  return {
    code,
    dependencies: ["react-native-version-info"],
    dev: false,
  };
}
