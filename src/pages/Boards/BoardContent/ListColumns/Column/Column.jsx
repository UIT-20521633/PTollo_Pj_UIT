import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloudIcon from "@mui/icons-material/Cloud";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import AddCardIcon from "@mui/icons-material/AddCard";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "~/utils/sorts";

const Column = ({ column }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sortedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  return (
    <Box
      sx={{
        minWidth: "300px",
        minHeight: "300px",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A1D20" : "#f1f2f4",
        backgroundSize: "cover",
        ml: 2,
        backgroundPosition: "center",
        borderRadius: "6px",
        height: "fit-content",
        maxHeight: (theme) =>
          `calc(${theme.Ptollo.boardContentHeight} - ${theme.spacing(3.5)})`,
      }}>
      {/* Header */}
      <Box
        sx={{
          px: 2,
          height: (theme) => theme.Ptollo.columnHeaderHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
          {column?.title}
        </Typography>
        <Box>
          <Tooltip title="More options">
            <MoreHorizRoundedIcon
              sx={{ cursor: "pointer", color: "text.primary" }}
              id="basic-column-menu"
              aria-controls={open ? "basic-menu-column" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          <Menu
            id="basic-menu-column"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-column-menu",
            }}>
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <CloudIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Card */}
      <ListCards cards={sortedCards} />

      {/* Footer */}
      <Box
        sx={{
          height: (theme) => theme.Ptollo.columnFooterHeight,
          display: "flex",
          alignItems: "center",
          px: 2,
          justifyContent: "space-between",
        }}>
        <Button sx={{ fontSize: "0.875rem" }} startIcon={<AddCardIcon />}>
          Add new card
        </Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Column;
