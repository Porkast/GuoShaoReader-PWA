import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Drawer, CssBaseline, Typography, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import RssFeedTwoToneIcon from '@mui/icons-material/RssFeedTwoTone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from "react-router-dom";
import Timeline from "./Timeline";


const drawerWidth = 240;

function Home(props) {

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState("timeline");
  const appBarRef = React.useRef(null);
  const appBarHeight = appBarRef.current?.clientHeight
  console.log("appBarHeight : ", appBarHeight)
  const navigate = useNavigate()


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handlerListItemClick = (index, menuType) => {
    setMobileOpen(!mobileOpen)
    setSelectedIndex(index)
    switch (menuType) {
      case "timeline":
        navigate("/timeline")
        break

      default:
        break
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton selected={selectedIndex === "timeline"} onClick={() => { handlerListItemClick("timeline", "timeline") }}>
            <ListItemIcon>
              {selectedIndex === "timeline" ? (
                <RssFeedTwoToneIcon color="primary" fontSize="large" />
              ) : <RssFeedTwoToneIcon fontSize="large" />}
            </ListItemIcon>
            <ListItemText primary="Timeline" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={selectedIndex === "userInfo"} onClick={() => { handlerListItemClick("userInfo", "userInfo") }}>
            <ListItemIcon>
              <ListItemIcon>
                {selectedIndex === "userInfo" ? (
                  <PersonOutlineOutlinedIcon color="primary" fontSize="large" />
                ) : <PersonOutlineOutlinedIcon fontSize="large" />}
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GuoShao
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="/timeline" element={<Timeline />} />
        </Routes>

      </Box>
    </Box>
  )
}
export default Home;
