import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
const CustomCardMedia = () => {
  return (
    <Card sx={{ minWidth: 200, position: "relative" }}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 132 }}
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            position: "relative",
            ml: 2, // Adds some space between avatar and text
            top: -26, // This positions the avatar halfway between image and text
            zIndex: 1, // Ensures avatar is on top
          }}>
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{
              width: 53,
              height: 53,
              border: "3px solid white", // Adds a border for better visual separation
            }}
          />
        </Box>
        <CardContent sx={{ pt: 0.1 }}>
          <Typography gutterBottom variant="h7" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomCardMedia;
