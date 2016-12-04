import * as yaml from 'js-yaml';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'development';
console.log(`Running in environment: ${environment}`);

const config: any = {};

function merge(obj1: Object, obj2: Object = {}) {
  for (const key of Object.keys(obj2)) {
    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      merge(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  }
}

const configFileNameCommon = `./config/common.yml`;
if (fs.existsSync(configFileNameCommon)) {
  console.log(`Loading common config file: ${configFileNameCommon}`);
  const configCommon = yaml.safeLoad(fs.readFileSync(configFileNameCommon, 'utf8'));
  merge(config, configCommon);
}

const configFileNameEnvironment = `./config/${environment}.yml`;
if (fs.existsSync(configFileNameEnvironment)) {
  console.log(`Loading environment config file: ${configFileNameEnvironment}`);
  const configEnvironment = yaml.safeLoad(fs.readFileSync(configFileNameEnvironment, 'utf8'));
  merge(config, configEnvironment);
}

export default config;
