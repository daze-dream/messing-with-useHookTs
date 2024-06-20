import { useBoolean } from "usehooks-ts";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  // const nav = useNavigate();
  const drawerWidth = 240;

  const drawerBoolean = useBoolean(false);

  return (
    <>
      <div id="base" style={{ display: "flex" }}>
        <CustomDrawer
          isOpen={drawerBoolean.value}
          onClose={() => drawerBoolean.setFalse()}
        ></CustomDrawer>
        <AppBar
          id="appbar"
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Button
              variant="text"
              sx={{ color: "black", outline: "none" }}
              onClick={() => router.navigate("/")}
            >
              <Typography variant="h6" noWrap component="div">
                An App For Your Troubles 😮
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex" }}>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => router.navigate("/basic_forms")}
                  >
                    <ListItemText primary={"Basic Forms"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => router.navigate("/anForm")}
                  >
                    <ListItemText primary={"React Form Hooks"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => router.navigate("/table_crap")}
                  >
                    <ListItemText primary={"Messing with Tables"} />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <div
                style={{
                  marginTop: `auto`,
                  position: "fixed",
                  bottom: 0,
                  textAlign: "center",
                  paddingBottom: 10,
                }}
              >

                <button
                  id="drawer-toggle"
                  onClick={() => {
                    console.log("list item clicked");
                    drawerBoolean.toggle();
                  }}
                >
                  {drawerBoolean.value ? "Close Drawer" : "Open Drawer"}{" "}
                </button>
              </div>
            </Box>
          </Drawer>
          <Box
            data-testid="blargh"
            component="main"
            sx={{ flexGrow: 1, marginTop: "50px" }}
          >
            <RouterProvider router={router} />
          </Box>
        </div>
      </div>
    </>
  );
}

export default App;
