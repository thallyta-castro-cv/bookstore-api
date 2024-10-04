import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Exige o uso de `===` e `!==` em vez de `==` e `!=` para evitar problemas de coerção de tipos
      "eqeqeq": "error",
      
      // Gera um aviso ao usar `console.log()`, útil para evitar deixar console em produção
      "no-console": "warn",
      
      // Evita declarar variáveis ou parâmetros que não são utilizados
      // Argumentos que começam com _ (underscore) são ignorados
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      
      // Exige que blocos de código em `if`, `else`, `for`, etc. estejam sempre entre chaves `{}`.
      "curly": "error",
      
      // Sugere o uso de `const` ao invés de `let` quando a variável não é reatribuída
      "prefer-const": "error",
      
      // Proíbe o uso de `var`, encorajando o uso de `let` ou `const` para escopos claros e mais previsíveis
      "no-var": "error",
      
      // Exige ou proíbe chaves em funções de seta (arrow functions) conforme necessário
      // Se o corpo da função for uma única expressão, as chaves são desnecessárias
      "arrow-body-style": ["error", "as-needed"],
      
      // Garante que todas as funções retornem consistentemente ou não retornem nada
      // Evita confusões em funções que às vezes retornam valores e às vezes não
      "consistent-return": "error",
    },
  },
];
