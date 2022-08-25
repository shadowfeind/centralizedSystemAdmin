require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// birat;
// sessionStorage.setItem(
//   "blueberrytoken",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYzA4ZTY5Zi01Zjc4LTQwMDMtOWY3Yi1jYTlmZDgzYjA0ZmEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUyMzkiLCJJRFVzZXIiOiIxNTIzOSIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMTciLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJEQVYgIFNjaG9vbCIsInBpZFJlZkZvckVkaXQiOiJkYXZAYWRtaW4iLCJleHAiOjE2NjIxOTY1MjQsImlzcyI6Imh0dHA6Ly9teXNpdGUuY29tIiwiYXVkIjoiaHR0cDovL215c2l0ZS5jb20ifQ.t3klE58dBEylxnZJChpBtEYOZa0Ca9X1akb6mgYXrCM"
// );
// sessionStorage.setItem(
//   "blueberryrefreshtoken",
//   "UzbW/4Tbl6lYI1uFEFPRHU8D232ldhI8E7oVu4zEZ64="
// );

//navajyoti
// sessionStorage.setItem(
//   "blueberrytoken",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZTZkMjcyOS1jYjQxLTQyNDEtODgyYS1jNGEyMjk4YWI4OTciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUxNjEiLCJJRFVzZXIiOiIxNTE2MSIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiOSIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6Ik5hamFqeW90aSAgQWRtaW4iLCJwaWRSZWZGb3JFZGl0IjoibmF2YWp5b3RpIiwiZXhwIjoxNjU5MjQzNTQzLCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.anSYWccGLApda_Awm4KiyOCTyfTF3OlKpSOtRpoKO_k"
// );
// sessionStorage.setItem(
//   "blueberryrefreshtoken",
//   "nL9KTAqiuGe9mj0WOKP80F6sYF5bGKEZcG8kfUzvUvU="
// );

// sessionStorage.setItem(
//   "blueberrytoken",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlN2FhZDUzOC05NmRhLTRkMmItOTJhNS00YjZlMDg5NGE4YWQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTA1MzMiLCJJRFVzZXIiOiIxMDUzMyIsIklEUm9sZSI6IjIiLCJNYXJrQXNBZG1pbiI6IlRydWUiLCJJREhSQnJhbmNoIjoiMSIsIklERGVwYXJ0bWVudCI6IjEiLCJjb21wYW55IjoiMiIsIklzVGVtcG9yYXJ5U2Vzc2lvbkVuYWJsZWQiOiJGYWxzZSIsIklzTmV3bHlBZGVkIjoiRmFsc2UiLCJJc0RlcGFydG1lbnRIZWFkIjoiRmFsc2UiLCJSZW1lbWJlck1lIjoiRmFsc2UiLCJGdWxsTmFtZSI6IkRpdmluZSBMaWdodCBTY2hvb2wiLCJwaWRSZWZGb3JFZGl0IjoiZGl2aW5lIiwiZXhwIjoxNjU3Nzc4OTQxLCJpc3MiOiJodHRwOi8vbXlzaXRlLmNvbSIsImF1ZCI6Imh0dHA6Ly9teXNpdGUuY29tIn0.CQg_cUQAXGL4FLqFfsefbjqxvSrIYTeACUuC5Qn1uMw"
// );
// sessionStorage.setItem(
//   "blueberryrefreshtoken",
//   "KzV6aRLXrieQdi86B5cJwp968QUG02okhfJdZl5VU0k="
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
