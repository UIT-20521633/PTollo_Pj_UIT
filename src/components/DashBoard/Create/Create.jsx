import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import theme from "~/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";

const Create = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // Xử lý responsive
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  // console.log(matches);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        variant="contained"
        sx={{ px: 2 }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="ButonMenu">
        {matches ? "Create" : <AddIcon sx={{ ml: 0 }} />}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        style={{ marginTop: theme.Ptollo.marTopMenu }}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { maxHeight: "190px", p: 0, maxWidth: "300px" },
        }}>
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "17px 15px ",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <DashboardCustomizeIcon />
            <Box sx={{ ml: 2, fontSize: "14px", fontWeight: "500" }}>
              Create board
            </Box>
          </Box>
          <Box
            sx={{
              display: "block",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              color: "#9FADBC",
              whiteSpace: "wrap",
              mt: 1, // Prevents wrapping
            }}>
            A board is made up of cards ordered on lists. Use it to manage
            projects, track information, or organize anything.
          </Box>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "13px 15px ",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <LibraryBooksIcon />
            <Box sx={{ ml: 2, fontSize: "14px", fontWeight: "500" }}>
              Start with a template
            </Box>
          </Box>
          <Box
            sx={{
              display: "block",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              color: "#9FADBC",
              whiteSpace: "wrap",
              mt: 1, // Prevents wrapping
            }}>
            Get started faster with a board template.
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Create;
