import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { FormattedMessage } from "react-intl";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { TextField } from "@mui/material";
import { useState } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CloseIcon from "@mui/icons-material/Close";
import LocalStorage from "../helpers/Localstorage";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const pages = [
  <FormattedMessage id="products.label" />,
  <FormattedMessage id="pricing.label" />,
  <FormattedMessage id="blog.label" />,
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const AvatarDropdown = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleAvatarClose();
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="avatar-menu"
        aria-haspopup="true"
        onClick={handleAvatarClick}
        color="inherit"
        sx={{ p: 0 }}
      >
        <Avatar src="/broken-image.jpg" />
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleAvatarClose}
      >
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

function ResponsiveAppBar({
  locale,
  onLocaleChange,
  isUserLogin,
  setIsUserLogin,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deliveryAreaData, setDeliveryAreaData] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectArea = (areaName) => {
    setSelectedArea(areaName);
    setSearchValue("");
    setDeliveryAreaData(null); // Clear the areas in the popover
    handlePopoverClose();
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSearchValue("");
  };

  const handleAddLocationClick = (val) => {
    fetch("http://localhost:5000/api/v1/delivery-area").then((response) => {
      console.log("==response");
      const data = response.json();
      if (val.length === 0 || val.length === 1 || val.length === 2) {
        setDeliveryAreaData(null);
      }
      if (val.length === 2) {
        data.then((actualdata) => {
          const filteredData = actualdata.data.filter((area) =>
            area.area_name.toLowerCase().includes(val.toLowerCase())
          );
          console.log(filteredData);
          setDeliveryAreaData(filteredData);
        });
      }
    });
  };

  const handleLogout = () => {
    LocalStorage.remove("token");
    setIsUserLogin(false);
    navigate("/login");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ zIndex: 1000 }}>
      {/* <div>hello</div> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            ShipMe
          </Typography>
          {/* <FormattedMessage id="message.simple" /> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          {/* <Typography
            data-testid="logo"
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <div className="delivery-location-container">
            <IconButton
              aria-label="add location"
              aria-owns={open ? "add-location-popover" : undefined}
              aria-haspopup="true"
              onClick={handlePopoverOpen}
              color="inherit"
            >
              <AddLocationIcon sx={{ color: "blue" }} />
            </IconButton>
            {selectedArea && (
              <div className="selected-area">
                <span>{selectedArea}</span>
              </div>
            )}
          </div>
          <Popover
            id="add-location-popover"
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Box p={2} style={{ width: "300px", textAlign: "left" }}>
              <Typography variant="subtitle1">Add your Location</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "-30px",
                  marginBottom: "10px",
                }}
              >
                <IconButton aria-label="close" onClick={handlePopoverClose}>
                  <CloseIcon data-testid="close" />
                </IconButton>
              </Box>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <SearchIcon style={{ marginRight: "8px" }} />
                <TextField
                  placeholder="Enter location"
                  variant="outlined"
                  size="small"
                  style={{ width: "100%" }}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    handleAddLocationClick(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <GpsFixedIcon style={{ marginRight: "8px" }} />
                <Typography>Search Nearby</Typography>
              </div>
              {deliveryAreaData && deliveryAreaData.length > 0 ? (
                deliveryAreaData.map((area) => (
                  <div
                    key={area.area_id}
                    style={{
                      cursor: "pointer",
                      marginTop: "8px",
                      color: "grey",
                    }}
                    onClick={() => handleSelectArea(area.area_name)}
                  >
                    {area.area_name}
                  </div>
                ))
              ) : (
                <Typography>No matching areas found</Typography>
              )}
              <img
                src="/assets/searchimg.jpg"
                style={{ width: "100%", marginTop: "8px" }}
                alt="search"
              />
            </Box>
          </Popover>

          {/* <SearchIcon /> */}
          <div className="btn" style={{ paddingLeft: "20px" }}>
            {console.log("is user logged in ", isUserLogin)}
            {isUserLogin ? (
              "Hi Pratiksha"
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  LocalStorage.remove("token");
                  navigate("/login");
                }}
              >
                <FormattedMessage id="Login" />
                {/* Login */}
              </Button>
            )}
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/register")}
            >
              <FormattedMessage id="Register.text" />
            </Button>

            {isUserLogin && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <AvatarDropdown onLogout={handleLogout} />
                </Tooltip>
              </Box>
            )}

            {/* <div style={{ textAlign: "center" }}>
              <select
                value={locale}
                onChange={(e) => onLocaleChange(e.target.value)}
              >
                <option value="en">en</option>
                <option value="es-MX">es-MX</option>
                <option value="ar">ar</option>
              </select>
            </div> */}
          </div>
          {/* 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
          {/* </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {/* {selectedArea && (
            <Typography variant="subtitle1" style={{ marginLeft: "20px" }}>
              {selectedArea}
            </Typography>
          )} */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
