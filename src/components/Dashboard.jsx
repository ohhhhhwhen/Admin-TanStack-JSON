import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
import CustomTable from "./CustomTable";
import { useState } from "react";
import NewEmployee from "./NewEmployee";
import NewAsset from "./NewAsset";

const drawerWidth = 240;
const tabArray = [
  { name: "Employees", icon: <PersonIcon /> },
  { name: "Assets", icon: <InventoryIcon /> },
  { name: "Requests", icon: <MailIcon /> },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Employees");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            IT Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {tabArray.map((tab) => (
            <ListItem
              key={tab.name}
              disablePadding
              style={{
                background: tab.name === activeTab ? "lightgrey" : null,
              }}
            >
              <ListItemButton onClick={() => setActiveTab(tab.name)}>
                <ListItemIcon>{tab.icon} </ListItemIcon>
                <ListItemText primary={tab.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveTab("New Employee")}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={"New Employee"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveTab("New Asset")}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={"New Asset"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <CustomTable activeTab={activeTab} />
        {activeTab === "New Employee" && <NewEmployee />}
        {activeTab === "New Asset" && <NewAsset />}
      </Box>
    </Box>
  );
};

export default Dashboard;
