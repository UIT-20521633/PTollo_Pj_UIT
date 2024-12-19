import * as React from "react";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import "./DashBoard.css";
import Stack from "@mui/material/Stack";
import WorkSpace from "./WorkSpace/Workspace";
import Recent from "./Recent/Recent";
import Starred from "./Starred/Starred";
import Templates from "./TemplatesDB/Templates";
import Create from "./Create/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";
import theme from "~/theme";
import { useColorScheme } from "@mui/material/styles";
import DashBoardPage from "~/pages/BoardsPage/BoardsPage";
// import CustomCardMedia from "../Card/CardMedia";
import TemplatePage from "~/pages/TemplatesP/TemplatePage";
import HomePage from "~/pages/Home/HomePage";
import DashBoardUser from "~/pages/WorkSpaceUser/BoardsUser/BoardsUser";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CardYourBoard from "../Card/CardYourBoard";
import BoardUser from "~/pages/WorkSpaceUserMain/BoardUser/BoardUser";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import BoardPage from "~/pages/Boards/_id";
import { Outlet } from "react-router-dom";
import { NAVIGATION_MAIN, NAVIGATION_USER } from "~/config/navigation";
import Profiles from "./Profiles/Profiles";
import Notifications from "./Notifications/Notifications";
import AutoCompleteSearchBoard from "./SearchBoards/AutoCompleteSearchBoard";
import { socketIoInstance } from "~/socketClient";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { useSelector } from "react-redux";

function PageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: pathname === "/userWorkspace/members" ? 0 : 4, // Xóa padding cho BoardPage
      }}>
      {pathname === "/dashboard" ? (
        <DashBoardPage />
      ) : pathname === "/templates" ? (
        <TemplatePage />
      ) : pathname === "/home" || pathname === "/userWorkspace/highlights" ? (
        <HomePage />
      ) : pathname === "/userWorkspace/homeBoard" ? (
        <DashBoardUser />
      ) : pathname === "/userWorkspace/boardUser" ? (
        <BoardUser />
      ) : pathname === "/userWorkspace/members" ? (
        <BoardPage />
      ) : (
        `Demo Page Content Here ${pathname}`
      )}
    </Box>
  );
}
function Search() {
  return (
    <Box>
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}>
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{
          display: { xs: "none", md: "inline-block" },
          mr: 1,
          minWidth: "120px",
        }}
      />
    </Box>
  );
}
function CustomThemeSwitcher() {
  const { setMode } = useColorScheme();

  const handleThemeChange = React.useCallback(
    (event) => {
      setMode(event.target.value);
    },
    [setMode]
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const toggleMenu = React.useCallback(
    (event) => {
      setMenuAnchorEl(isMenuOpen ? null : event.currentTarget);
      setIsMenuOpen((previousIsMenuOpen) => !previousIsMenuOpen);
    },
    [isMenuOpen]
  );

  return (
    <Box>
      <Tooltip title="Settings" enterDelay={1000}>
        <div>
          <IconButton type="button" aria-label="settings" onClick={toggleMenu}>
            <SettingsIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Popover
        open={isMenuOpen}
        anchorEl={menuAnchorEl}
        onClose={toggleMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus>
        <Box sx={{ p: 2 }}>
          <FormControl>
            <FormLabel id="custom-theme-switcher-label">Theme</FormLabel>
            <RadioGroup
              aria-labelledby="custom-theme-switcher-label"
              defaultValue="system"
              name="custom-theme-switcher"
              onChange={handleThemeChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel
                value="system"
                control={<Radio />}
                label="System"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  );
}
const ToolbarActions = () => (
  <Stack
    direction="row"
    spacing={1}
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      overflowX: "auto",
      py: 1,
    }}>
    <Box sx={{ display: "flex", alignItems: "center", pr: 40 }}>
      <WorkSpace />
      <Recent />
      <Starred />
      <Templates />
      <Create />
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* <Search /> */}
      {/* Tìm kiếm nhanh 1 or nhiều board */}
      <AutoCompleteSearchBoard />
      {/* xử lý hiển thị các thông báo - notifications ở đây */}
      <Notifications />
      <Tooltip title="Help">
        <Box sx={{ cursor: "pointer" }}>
          <HelpOutlineOutlinedIcon />
        </Box>
      </Tooltip>
      <CustomThemeSwitcher />
      <Profiles />
    </Box>
  </Stack>
);
const DashBoard = ({ hideNav }) => {
  // const router = useDemoRouter("/dashboard");
  //some(): Duyệt qua từng phần tử trong mảng pathNavigationUser. Đối với mỗi phần tử, nó kiểm tra điều kiện trong hàm callback.
  //endsWith(): Phương thức này kiểm tra xem chuỗi path có kết thúc bằng chuỗi /userWorkspace/${segment} hay không.
  // Hàm xử lý khi nhấn vào logo để đặt lại điều hướng về NAVIGATION_MAI
  //lấy userId từ store
  const userId = useSelector(selectCurrentUser)._id;
  socketIoInstance.emit("registerUser", { userId: userId });
  return (
    <AppProvider
      branding={{
        title: " ",
        logo: (
          <img
            src="../../../public/icons/icon.png"
            alt="logo"
            style={{ maxHeight: "60px", cursor: "pointer" }}
          />
        ),
      }}
      navigation={NAVIGATION_MAIN}
      theme={theme}>
      <DashboardLayout
        hideNavigation={hideNav}
        slots={{
          toolbarActions: ToolbarActions,
        }}>
        {/* <DemoPageContent pathname={"/boar"} /> */}
        {/* Phần chính của Dashboard */}
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashBoard;
