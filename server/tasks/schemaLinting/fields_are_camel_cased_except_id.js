const {
  ValidationError
} = require("graphql-schema-linter/lib/validation_error");

const camelCaseTest = RegExp("^[a-z][a-zA-Z0-9]*$");

// Our mongodb collections use _id – so this allows for an exception on that field
// Based off of: https://github.com/cjoudrey/graphql-schema-linter/blob/master/src/rules/fields_are_camel_cased.js
export function FieldsAreCamelCasedExceptId(context) {
  return {
    FieldDefinition(node, key, parent, path, ancestors) {
      const fieldName = node.name.value;
      if (fieldName !== "_id" && !camelCaseTest.test(fieldName)) {
        const parentName = ancestors[ancestors.length - 1].name.value;
        context.reportError(
          new ValidationError(
            "fields-are-camel-cased",
            `The field \`${parentName}.${fieldName}\` is not camel cased.`,
            [node]
          )
        );
      }
    }
  };
}

module.exports = { FieldsAreCamelCasedExceptId };
