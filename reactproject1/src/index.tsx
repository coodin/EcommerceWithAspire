import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import App from "./App";

// MSAL imports
import {
  PublicClientApplication,
  EventType,
  EventMessage,
} from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import isAccount from "./utils/Helper";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  const account = msalInstance.getActiveAccount();

  console.log("accounts from initialize", accounts);
    console.log("account from initialize", account);
   
    
  if (!account && accounts.length > 0) {
    console.log("OGun Worked");

    msalInstance.setActiveAccount(accounts[0]);
  }

  // msalInstance.addEventCallback((event: EventMessage) => {
  //   if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
  //     const payload = event.payload as AuthenticationResult;
  //     const account = payload.account;
  //     msalInstance.setActiveAccount(account);
  //   }
  // });

  // Optional - This will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  msalInstance.addEventCallback((event: EventMessage) => {
    if (
      event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS
    ) {
      console.log("Active Event from addEventCallback", event.eventType);
      console.log("Active Event Data from addEventCallback", event.payload);
      console.log(
        "Active Event Data type from addEventCallback",
        typeof event.payload
      );

      if (isAccount(event.payload)) {
        // console.log(
        //   "LOGIN_SUCCESS,ACQUIRE_TOKEN_SUCCESS,SSO_SILENT_SUCCESS",
        //   event.payload
        // );
        console.log("Workedddddddddddddddddddddddddddd");

        msalInstance.setActiveAccount(event.payload);
      }
    }
  });

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <Router>
      <ThemeProvider theme={theme}>
        <App pca={msalInstance} />
      </ThemeProvider>
    </Router>
  );
});
