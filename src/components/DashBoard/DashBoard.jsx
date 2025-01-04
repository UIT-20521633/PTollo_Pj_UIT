import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./DashBoard.css";
import Stack from "@mui/material/Stack";
import Recent from "./Recent/Recent";
import Starred from "./Starred/Starred";
import Templates from "./TemplatesDB/Templates";
import Create from "./Create/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import theme from "~/theme";
import { useColorScheme } from "@mui/material/styles";
// import CustomCardMedia from "../Card/CardMedia";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Outlet } from "react-router-dom";
import { NAVIGATION_MAIN } from "~/config/navigation";
import Profiles from "./Profiles/Profiles";
import Notifications from "./Notifications/Notifications";
import AutoCompleteSearchBoard from "./SearchBoards/AutoCompleteSearchBoard";
import { socketIoInstance } from "~/socketClient";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { useSelector } from "react-redux";
import { fetchBoardsAPI } from "~/apis";
import { useState } from "react";
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from "@toolpad/core/Account";
import Typography from "@mui/material/Typography";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

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
function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0} overflow="hidden">
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  /**
   * The handler used when the preview is expanded
   */
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  /**
   * The state of the Account popover
   * @default false
   */
  open: PropTypes.bool,
};

const accounts = [
  {
    id: 1,
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
    projects: [
      {
        id: 3,
        title: "Project X",
      },
    ],
  },
  {
    id: 2,
    name: "Bharat MUI",
    email: "bharat@mui.com",
    color: "#8B4513", // Brown color
    projects: [{ id: 4, title: "Project A" }],
  },
];

function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              columnGap: 2,
            }}>
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "0.95rem",
                  bgcolor: account.color,
                }}
                src={account.image ?? ""}
                alt={account.name ?? ""}>
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(
    () => createPreviewComponent(mini),
    [mini]
  );
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
};
const DashBoard = ({ hideNav }) => {
  // Số lượng bản ghi boards hiển thị tối đa trên 1 page tùy dự án (thường sẽ là 12 cái)
  const [boards, setBoards] = useState(null);
  // Tổng toàn bộ số lượng bản ghi boards có trong Database mà phía BE trả về để FE dùng tính toán phân trang
  const [totalBoards, setTotalBoards] = useState(null);
  const updateStateData = (res) => {
    setBoards(res.boards || []);
    setTotalBoards(res.totalBoards || 0);
  };
  const afterCreateNewBoard = () => {
    // Đơn giản là cứ fetch lại danh sách board tương tự trong useEffect (f5 lại trang)
    fetchBoardsAPI(location.search).then(updateStateData);
  };
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
      <Box sx={{ display: "flex", alignItems: "center", pr: 62 }}>
        {/* <WorkSpace /> */}
        <Recent />
        <Starred />
        <Templates />
        <Create afterCreateNewBoard={afterCreateNewBoard} />
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
          sidebarFooter: SidebarFooterAccount,
        }}>
        {/* <DemoPageContent pathname={"/boar"} /> */}
        {/* Phần chính của Dashboard */}
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashBoard;
