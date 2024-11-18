import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const CardSmall = ({ userName = true }) => {
  const [star, setStar] = React.useState(false); // Điều khiển icon sao là đầy hay rỗng
  const [showStar, setShowStar] = React.useState(false); // Điều khiển hiển thị icon khi hover và khi bấm

  const handleStarStatus = () => {
    setStar(!star); // Chuyển đổi icon sao giữa đầy và rỗng
    setShowStar(true); // Giữ icon full ngôi sao luôn hiển thị sau khi bấm
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "0px 8px 2px",
        position: "relative",
      }}
      onMouseEnter={() => setShowStar(true)} // Hiển thị icon khi hover
      //star là false thì ẩn icon và !star là true thì thực hiện hàm setShowStar(false) nghĩa là ẩn icon
      //star là true thì hiện icon và !star là false thì không thực hiện hàm setShowStar(false) nghĩa là không ẩn icon
      onMouseLeave={() => !star && setShowStar(false)} // Ẩn icon nếu chưa bấm
    >
      <Avatar
        src="https://picsum.photos/200/300?random=2"
        variant="rounded"></Avatar>
      <Box sx={{ ml: 2 }}>
        <Box sx={{ fontSize: "14px", fontWeight: "500" }}>
          Mise-En-Place Personal Productivity System
        </Box>
        {userName && (
          <Box
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              color: "#9FADBC",
            }}>
            namnguyen7040&apos;s workspace
          </Box>
        )}
      </Box>
      {/* Hiển thị nút icon dựa trên hover hoặc khi đã bấm */}
      {showStar && (
        <Box sx={{ ml: 1 }}>
          <Button onClick={handleStarStatus} sx={{ p: 0, m: 0, minWidth: 0 }}>
            {star ? (
              <StarRoundedIcon sx={{ color: "#e8e809" }} />
            ) : (
              <StarBorderRoundedIcon sx={{ color: "#e8e809" }} />
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CardSmall;
