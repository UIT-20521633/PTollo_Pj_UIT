import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";

const CustomCardMedia = ({ template, onUseTemplate, onShareTemplate }) => {
  return (
    <Card sx={{ minWidth: 200, position: "relative" }}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 132 }}
          image={
            template?.background ||
            "https://mui.com/static/images/cards/contemplative-reptile.jpg"
          }
          title={template?.title}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            position: "relative",
            ml: 2,
            top: -26,
            zIndex: 1,
          }}>
          <Avatar
            alt={template?.creator || "Template Creator"}
            src="https://mui.com/static/images/avatar/1.jpg" // Thay bằng ảnh người tạo template (nếu có)
            sx={{
              width: 53,
              height: 53,
              border: "3px solid white",
            }}
          />
        </Box>
        <CardContent sx={{ pt: 0.1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {template?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {template?.description || "No description available"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onUseTemplate(template)}>
          Use Template
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            onShareTemplate(template);
            navigator.clipboard.writeText(
              `${window.location.origin}/templates/${template._id}`
            );
            alert("Template link copied to clipboard!");
          }}>
          Share
        </Button>
      </Box>
    </Card>
  );
};

export default CustomCardMedia;
