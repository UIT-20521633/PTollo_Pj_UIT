import React from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import IconButton from "@mui/material/IconButton";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import theme from "~/theme";
import Chip from "@mui/material/Chip";
import VpnLockOutlinedIcon from "@mui/icons-material/VpnLockOutlined";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { capitalizeFirstLetter } from "~/utils/formattersAZ";

const MENU_STYLE = {
  backgroundColor: theme.palette.primary.main,
  color: "white",
  border: "none",
  px: "5px",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "13px",
  "&:hover": {
    borderWidth: "2px",
    borderColor: "white",
    backgroundColor: "#2C4A8A",
  },
};

const BoardBar = ({ board }) => {
  // object Detructuring: bóc tách phần tử

  const [isMarked, setIsMarked] = React.useState(false);
  const handleToggleMark = () => {
    setIsMarked(!isMarked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#ffffff3d", // Màu nền với độ trong suốt
        backdropFilter: "blur(4px)", // Hiệu ứng mờ
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)", // Tạo bóng
        color: "white",
        width: "100%",
        position: "relative",
        flex: "1",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" }, // Responsive layout
        alignItems: "center",
        height: theme.Ptollo.boardBarHeight,
        px: 2,
        py: "6px",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-end" }, // Center align on small screens
        }}>
        <Chip
          sx={{
            color: theme.palette.primary.main,
            border: "none",
            px: "5px",
            fontWeight: "800",
            backgroundColor: "transparent",
            fontSize: "20px",
          }}
          label={board?.title}
        />
        <Box onClick={handleToggleMark}>
          <Tooltip title="Click to star or unstar this template. Starred templates show up at the top of your boards list.">
            {isMarked ? (
              <StarIcon sx={{ color: "yellow" }} />
            ) : (
              <StarOutlineIcon sx={{ color: "yellow" }} />
            )}
          </Tooltip>
        </Box>
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockOutlinedIcon />}
          label={capitalizeFirstLetter(board?.type)}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon sx={{ ml: 0 }} />}
          label="Add to Drive"
        />
        <Tooltip title="Board">
          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon sx={{ ml: 0 }} />}
            label="Board"
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: { xs: 2, sm: 0 },
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-end" }, // Center align on small screens
        }}>
        <Tooltip title="Automation">
          <IconButton>
            <FlashOnIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Tooltip>
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon sx={{ ml: 0 }} />}
          label="Filter"
        />
        <Button
          variant="contained"
          startIcon={<GroupAddOutlinedIcon sx={{ ml: 0 }} />}
          sx={{
            textTransform: "none",
          }}>
          Invite
        </Button>
        <AvatarGroup
          max={3}
          sx={{
            gap: "7px",
            "& .MuiAvatar-root": {
              width: { xs: "26px", md: "28px" }, // Responsive avatar size
              height: { xs: "26px", md: "28px" },
              border: "2px solid #fff",
              color: "#fff",
              cursor: "pointer",
              "&:first-of-type": {
                backgroundColor: "#95a5a6",
              },
            },
          }}>
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Travis Howard">
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip title="Cindy Baker">
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip title="Agnes Walker">
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          </Tooltip>
          <Tooltip title="Trevor Henderson">
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
