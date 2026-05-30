import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Regras novas e agressivas do toolchain atualizado (eslint 10 / react-hooks 7)
      // que sinalizam padrões já existentes e testados (sincronização de URL em
      // efeitos, providers que exportam hook ao lado do componente). Mantidas como
      // aviso para não bloquear o build; revisar como tech-debt num passe dedicado.
      'react-hooks/set-state-in-effect': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },
  {
    // Arquivos de teste usam mocks soltos (fetch, produtos); `any` é aceitável aqui.
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
