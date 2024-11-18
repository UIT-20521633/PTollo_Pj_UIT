import CustomCardMedia from "~/components/Card/CustomCardMedia";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CollectionsSharpIcon from "@mui/icons-material/CollectionsSharp";
const TemplatePage = () => {
  return (
    <div className="container">
      <Box
        sx={{
          fontSize: "16px",
          fontWeight: "900",
          margin: "10px 0 30px 20px",
        }}>
        <CollectionsSharpIcon sx={{ mr: 1 }} /> Templates categories
      </Box>
      <Box flexGrow={1} sx={{ ml: 2 }}>
        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 4 }}
          columnSpacing={{ xs: 0, sm: 3, md: 3 }}
          columns={{ xs: 8, sm: 10, md: 24 }}>
          {Array.from(Array(7)).map((_, index) => (
            <Grid key={index} size={{ xs: 8, sm: 5, md: 8 }}>
              <CustomCardMedia />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
export default TemplatePage;
