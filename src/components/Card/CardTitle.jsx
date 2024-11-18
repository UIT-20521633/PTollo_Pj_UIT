import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
const CardTitle = ({ user = null }) => {
  const [star, setStar] = React.useState(false);
  const handelStarStatus = () => {
    setStar(!star);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "0px 8px 2px",
      }}>
      <Avatar
        src="https://picsum.photos/200/300?random=2"
        variant="rounded"></Avatar>
      <Box sx={{ ml: 2 }}>
        <Box
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "100%",
            wordWrap: "break-word",
          }}>
          Mise-En-Place Personal Productivity System
        </Box>
        <Box
          sx={{
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "16px",
            color: "#9FADBC",
            display: user ? "block" : "none",
          }}>
          {user} workspace
        </Box>
      </Box>
      <Box sx={{ ml: 1 }}>
        <Button onClick={handelStarStatus} sx={{ p: 0, m: 0, minWidth: 0 }}>
          {star ? (
            <StarRoundedIcon sx={{ color: "#e8e809" }} />
          ) : (
            <StarBorderRoundedIcon sx={{ color: "#e8e809" }} />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CardTitle;
