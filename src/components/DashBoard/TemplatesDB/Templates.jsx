import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import theme from "~/theme";

const Templates = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openList, setOpenList] = React.useState(true); // Controls the collapse state
  const open = Boolean(anchorEl); // Controls the menu state

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickList = () => {
    setOpenList(!openList);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="ButonMenu">
        Templates <KeyboardArrowDownRoundedIcon sx={{ fontSize: "xx-large" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        style={{ marginTop: theme.Ptollo.marTopMenu }}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { maxHeight: "183px", p: 0, maxWidth: "270px" },
        }}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"></ListSubheader>
          }>
          <ListItemButton
            sx={{
              padding: "10px 15px 0px 2px",
              fontSize: "14px",
              margin: "0px 10px 0px 11px",
              color: "#9FADBC",
              fontWeight: "600",
            }}
            onClick={handleClickList}>
            Top templates
            <Box sx={{ ml: 14 }}>
              {openList ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </ListItemButton>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0px 8px 0px",
                  }}>
                  <Avatar
                    src="https://picsum.photos/seed/picsum/200/300"
                    variant="rounded"></Avatar>
                  <Box
                    sx={{
                      ml: 2,
                      fontSize: "14px",
                      fontWeight: "500",
                      whiteSpace: "nowrap", // Prevents wrapping
                      overflow: "hidden", // Hides overflow
                      textOverflow: "ellipsis", // Adds ellipsis when text is too long
                      maxWidth: "160px", // Adjust width as needed
                    }}>
                    PicSum Templatefdsfasafasfsfasf
                  </Box>
                </Box>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Menu>
    </div>
  );
};

export default Templates;
