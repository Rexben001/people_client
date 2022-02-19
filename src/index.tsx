import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createClient,
  Provider as UrqlProvider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const URL = process.env.API_URL || "http://localhost:3333/graphql";

const client = createClient({
  url: URL,
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <UrqlProvider value={client}>
        <App />
      </UrqlProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
