const fs = require('fs');
const yaml = require('yaml');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'));
const data = yaml.parse(fs.readFileSync('public/admin/config.yaml', 'utf8'));

const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

const valid = validate(data);
if (!valid) {
  console.log(validate.errors);
} else {
  console.log("YAML is valid!");
}
