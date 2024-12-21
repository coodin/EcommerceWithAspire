import { Configuration } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_SignUpAndSignIn",
    editProfile: "B2C_1_ProfileEditingUserFlow",
  },
  authorities: {
    // entraAdminSignIn: {
    //   authority:
    //     "https://{YourDirectoryName}.b2clogin.com/{YourDirectoryName}.onmicrosoft.com/B2C_1_EntraAdminID",
    // },
    signUpSignIn: {
      authority:
        "https://{YourDirectoryName}.b2clogin.com/{YourDirectoryName}.onmicrosoft.com/B2C_1_SignUpAndSignIn",
    },
    editProfile: {
      scopes: [""],
      authority:
        "https://{YourDirectoryName}.b2clogin.com/{YourDirectoryName}.onmicrosoft.com/B2C_1_ProfileEditingUserFlow",
    },
  },
    authorityDomain: "{YourDirectoryName}.b2clogin.com",
};
// Determine if the app is running locally (on localhost) or in production
//const isLocalhost = window.location.hostname === "localhost";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "{YourClientID}",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "http://localhost:3030",
    postLogoutRedirectUri: "/",
  },
  cache: {
    // cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
  },
};
