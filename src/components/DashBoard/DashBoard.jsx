import * as React from "react";
import PropTypes from "prop-types";
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
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import Badge from "@mui/material/Badge";
import theme from "~/theme";
import { useColorScheme } from "@mui/material/styles";
import DashBoardPage from "~/pages/DashBoardMain/DashBoardPage";
// import CustomCardMedia from "../Card/CardMedia";
import TemplatePage from "~/pages/TemplatesP/TemplatePage";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomePage from "~/pages/Home/HomePage";
import DashBoardUser from "~/pages/WorkSpaceUser/DashBoardUser/DashBoardUser";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CardYourBoard from "../Card/CardYourBoard";
import BoardUser from "~/pages/WorkSpaceUserMain/BoardUser/BoardUser";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import BoardPage from "~/pages/Boards/BoardPage";

const NAVIGATION_MAIN = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "templates",
    title: "Templates",
    icon: <LibraryBooksIcon />,
  },
  {
    segment: "home",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Workspaces",
  },
  {
    segment: "userWorkspace",
    title: (
      <Box sx={{ fontSize: "14px", fontWeight: "600" }}>
        NamNguyen7040s <br />
        Workspace 1
      </Box>
    ),
    icon: (
      <Avatar
        sx={{
          width: "28px",
          height: "28px",
          background: theme.Ptollo.avatarColor,
          fontWeight: "700",
          color: theme.Ptollo.colorNameAvatar,
        }}
        variant="rounded">
        N
      </Avatar>
    ),
    children: [
      {
        segment: "homeBoard",
        title: "Dashboard",
        icon: <DashboardIcon />,
      },
      {
        segment: "highlights",
        title: "Highlights",
        icon: <FavoriteBorderTwoToneIcon />,
      },
      {
        segment: "views",
        title: "Views",
        icon: <GridViewRoundedIcon />,
      },
      {
        segment: "members",
        title: (
          <Box>
            Members
            <button className="btn" style={{ marginLeft: "100px" }}>
              <AddOutlinedIcon />
            </button>
          </Box>
        ),
        icon: <PeopleAltIcon />,
      },
      {
        segment: "settings",
        title: "Settings",
        icon: <SettingsIcon />,
      },
    ],
  },
];
const NAVIGATION_USER = [
  {
    kind: "header",
    title: "Workspaces",
  },
  {
    segment: "userWorkspace",
    title: (
      <Box sx={{ fontSize: "14px", fontWeight: "600" }}>
        NamNguyen7040s <br />
        Workspace 1
      </Box>
    ),
    icon: (
      <Avatar
        sx={{
          width: "28px",
          height: "28px",
          background: theme.Ptollo.avatarColor,
          fontWeight: "700",
          color: theme.Ptollo.colorNameAvatar,
        }}
        variant="rounded">
        N
      </Avatar>
    ),
    children: [
      {
        segment: "boardUser",
        title: "Dashboard",
        icon: <DashboardIcon />,
      },
      {
        segment: "members",
        title: (
          <Box>
            Members
            <button className="btn" style={{ marginLeft: "100px" }}>
              <AddOutlinedIcon />
            </button>
          </Box>
        ),
        icon: <PeopleAltIcon />,
      },
      {
        segment: "settings",
        title: "Settings",
        icon: <SettingsIcon />,
      },
      {
        kind: "header",
        title: (
          <Box sx={{ fontSize: "14px", fontWeight: "600" }}>
            Workspace views
          </Box>
        ),
      },
      {
        segment: "views/table",
        title: "Table",
        icon: <ViewListOutlinedIcon />,
      },
      {
        segment: "views/calendar",
        title: "Calendar",
        icon: <CalendarMonthIcon />,
      },
      {
        kind: "header",
        title: (
          <Box sx={{ fontSize: "14px", fontWeight: "600" }}>Your boards</Box>
        ),
      },
      {
        segment: "templates-1",
        title: (
          <CardYourBoard title={"Mise-En-Place Personal Productivity System"} />
        ),
      },
      {
        segment: "templates-2",
        title: <CardYourBoard title={"dfadaD"} />,
      },
      {
        segment: "templates-2",
        title: <CardYourBoard title={"templates nam"} />,
      },

      {},
    ],
  },
];
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: pathname === "/userWorkspace/members" ? 0 : 4, // Xóa padding cho BoardPage
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // textAlign: "center",
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
      <Search />
      <Tooltip title="Notification">
        <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
          <NotificationsOutlinedIcon />
        </Badge>
      </Tooltip>
      <Tooltip title="Help">
        <Box sx={{ cursor: "pointer" }}>
          <HelpOutlineOutlinedIcon />
        </Box>
      </Tooltip>
      <CustomThemeSwitcher />
    </Box>
  </Stack>
);
DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};
const DashBoard = () => {
  const [session, setSession] = React.useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  // State để kiểm soát điều hướng hiện tại
  const [activeNavigation, setActiveNavigation] =
    React.useState(NAVIGATION_MAIN);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter("/dashboard");
  //some(): Duyệt qua từng phần tử trong mảng pathNavigationUser. Đối với mỗi phần tử, nó kiểm tra điều kiện trong hàm callback.
  //endsWith(): Phương thức này kiểm tra xem chuỗi path có kết thúc bằng chuỗi /userWorkspace/${segment} hay không.
  React.useEffect(() => {
    const pathNavigationUser = [
      "views",
      "members",
      "settings",
      "boardUser",
      "table",
      "calendar",
    ];

    if (
      pathNavigationUser.some((segment) =>
        router.pathname.endsWith(`/userWorkspace/${segment}`)
      )
    ) {
      setActiveNavigation(NAVIGATION_USER);
    } else {
      setActiveNavigation(NAVIGATION_MAIN);
    }
  }, [router.pathname]);
  // Hàm xử lý khi nhấn vào logo để đặt lại điều hướng về NAVIGATION_MAIN
  const handleLogoClick = () => {
    setActiveNavigation(NAVIGATION_MAIN);
    router.push("/dashboard"); // Điều hướng về trang dashboard chính
  };

  // Xử lý khi nhấn vào các mục trong navigation
  const handleNavigationClick = (path) => {
    if (path === "/userWorkspace/views") {
      router.push("/userWorkspace/table");
      return;
    }
    // Nếu đang ở NAVIGATION_USER, ngăn điều hướng
    if (activeNavigation === NAVIGATION_USER) {
      return; // Không làm gì nếu đang ở NAVIGATION_USER
    }

    // Điều hướng bình thường khi không phải NAVIGATION_USER
    router.push(path);
  };

  AppProvider.propTypes = {
    navigation: PropTypes.arrayOf(
      PropTypes.shape({
        segment: PropTypes.string,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        icon: PropTypes.element,
        kind: PropTypes.string,
        children: PropTypes.array,
      })
    ),
  };

  return (
    <AppProvider
      branding={{
        title: " ",
        logo: (
          <img
            src="../../../public/icons/icon.png"
            alt="logo"
            style={{ maxHeight: "60px", cursor: "pointer" }}
            onClick={handleLogoClick} // Đặt lại điều hướng khi nhấn vào logo
          />
        ),
      }}
      session={session}
      authentication={authentication}
      navigation={activeNavigation}
      theme={theme}
      router={{
        ...router,
        push: handleNavigationClick, // Kiểm soát điều hướng tùy chỉnh
      }}>
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActions,
        }}>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashBoard;
