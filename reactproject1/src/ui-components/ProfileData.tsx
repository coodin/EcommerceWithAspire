import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { msalInstance } from "../";
import { AccountInfo } from "@azure/msal-browser";
import { useIsAuthenticated } from "@azure/msal-react";
import { useLoading } from "../store/store";

// export type GraphData = {
//   displayName: string;
//   jobTitle: string;
//   mail: string;
//   businessPhones: string[];
//   officeLocation: string;
// };

export const ProfileData = () => {
  const activeAccount = msalInstance.getActiveAccount();
  const isAuthenticated = useIsAuthenticated();
  const loading = useLoading((state) => state.loading);

  //console.log("idTokenClaims", account?.idTokenClaims);

  useEffect(() => {
    console.log("activeAccount", activeAccount);
  }, [activeAccount]);
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  if (loading === "Loading") {
    return <div>Loading</div>;
  } else if (loading === "Error") {
    return <div>There is an error</div>;
  }

  return (
    <List className="profileData">
      <JobTitleListItem
        jobTitle={
          (activeAccount?.idTokenClaims?.given_name as string) ??
          "There is no 'given_name'"
        }
      />
      {/* <NameListItem name={graphData.displayName} />
      <JobTitleListItem jobTitle={graphData.jobTitle} />
      <MailListItem mail={graphData.mail} />
      <PhoneListItem phone={graphData.businessPhones[0]} />
      <LocationListItem location={graphData.officeLocation} /> */}
    </List>
  );
};

const NameListItem: React.FC<{ name: string }> = ({ name }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <PersonIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Name" secondary={name} />
  </ListItem>
);

const JobTitleListItem: React.FC<{ jobTitle: string }> = ({ jobTitle }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <WorkIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Title" secondary={jobTitle} />
  </ListItem>
);

const MailListItem: React.FC<{ mail: string }> = ({ mail }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <MailIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Mail" secondary={mail} />
  </ListItem>
);

const PhoneListItem: React.FC<{ phone: string }> = ({ phone }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <PhoneIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Phone" secondary={phone} />
  </ListItem>
);

const LocationListItem: React.FC<{ location: string }> = ({ location }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <LocationOnIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Location" secondary={location} />
  </ListItem>
);
