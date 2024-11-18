import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CardSmall from "~/components/Card/CardSmall";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
const ListHomePage = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <nav>
        <List>
          {/* starred */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StarBorderRoundedIcon sx={{ ml: 1 }} />
              </ListItemIcon>
              <Box sx={{ fontSize: "16px", fontWeight: "700" }}>Starred</Box>
            </ListItemButton>
          </ListItem>
          <Box>
            <ListItem disablePadding>
              <ListItemButton>
                <CardSmall userName={false} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <CardSmall />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <CardSmall />
              </ListItemButton>
            </ListItem>
          </Box>
          <Divider />
          {/* Recent */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessTimeOutlinedIcon sx={{ ml: 1 }} />
              </ListItemIcon>
              <Box sx={{ fontSize: "16px", fontWeight: "700" }}>
                Recently viewed
              </Box>
            </ListItemButton>
          </ListItem>
          <Box>
            <ListItem disablePadding>
              <ListItemButton>
                <CardSmall userName={false} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <CardSmall />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <CardSmall userName={false} />
              </ListItemButton>
            </ListItem>
          </Box>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Links" />
            </ListItemButton>
          </ListItem>
          <Box>
            <ListItem disablePadding>
              <ListItemButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Avatar variant="rounded" sx={{ mr: 2 }}>
                    <AddIcon sx={{ m: 1 }} />
                  </Avatar>
                  <Box sx={{ fontSize: "15px", fontWeight: "500" }}>
                    Create a board
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
          </Box>
        </List>
      </nav>
    </Box>
  );
};
export default ListHomePage;
