const {
  ValidationError
} = require("graphql-schema-linter/lib/validation_error");

function InputsNamedCorrectly(context) {
  return {
    InputObjectTypeDefinition(node) {
      const inputObjectTypeName = node.name.value;

      if (!/.Input$/.test(inputObjectTypeName)) {
        context.reportError(
          new ValidationError(
            "inputs-named-correctly",
            `The input type ${inputObjectTypeName} must end in Input. Try: ${inputObjectTypeName}Input`,
            [node]
          )
        );
      }
    }
  };
}

module.exports = { InputsNamedCorrectly };
