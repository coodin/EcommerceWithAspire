import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import { Link as RouterLink } from "react-router-dom";


const NavBar = () => {
  //const { instance, } = useMsal();
  //const activeAccount = instance.getActiveAccount();

  //const isAuthenticated = useIsAuthenticated();

  // useEffect(() => {
  //   console.log("activeAccount", activeAccount);
  // }, [activeAccount]);

  // useEffect(() => {
  //   console.log("isAuthenticated", isAuthenticated);
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   const authRequest: SilentRequest = {
  //     ...loginRequest,
  //   };

  //   if (isAuthenticated && inProgress === InteractionStatus.None) {
  //     instance
  //       .acquireTokenSilent(authRequest)
  //       .then((authResult) => {
  //         if (isAccount(authResult)) {
  //           console.log("acquireTokenSilent", authResult);
  //           //Please send this loading logic to zustand to make it more clear that the access token has been captured by acquireTokenSilent method
  //           setLoading("Finsihed");
  //         }
  //       })
  //       .catch(async (error) => {
  //         setLoading("Error");
  //         console.log(error);

  //         if (error instanceof InteractionRequiredAuthError) {
  //           // fallback to interaction when silent call fails
  //           console.log("Error inside ", error);

  //           try {
  //             await instance.acquireTokenRedirect(authRequest);
  //           } catch (error) {
  //             console.error("acquireTokenRedirect has been failed");
  //           }
  //         }
  //       });
  //   }
  // }, [inProgress, isAuthenticated, accounts, instance]);
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{ flexGrow: 1 }}>
            <Link component={RouterLink} to="/" color="inherit" variant="h6">
              MS Identity Platform
            </Link>
          </Typography>
          <WelcomeName />
          <SignInSignOutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
