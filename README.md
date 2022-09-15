DOTENV
// Instale a lib
yarn add react-native-dotenv
yarn add @types/react-native-dotenv


// Adicione o modulo no seu arquivo babel.config.js
plugins: [
     ["module:react-native-dotenv", {
       "moduleName": "react-native-dotenv"
     }]
   ],
   
   
// Crie essa pasta dentro do @types
1- dentro da pasta de @types crie uma pasta 'env', 
2- e dentro dela crie um arquivo 'env.d.ts'


// dentro do arquivo env.d.ts insira:
declare module 'react-native-dotenv' {
  export const CLIENT_ID: string;
  export const REDIRECT_URI: string;
}
   

// No arquivo tsconfig.json insira:
"typeRoots": ["./src/@types/env"],
     
   
// Para importar as variaveis utilize assim agora:
import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';
