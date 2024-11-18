import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import Box from "@mui/material/Box";
import { mockData } from "~/apis/mock-data";
const BoardPage = () => {
  return (
    <Box
      sx={{
        height: (theme) => `calc(100vh - ${theme.Ptollo.appBarHeight})`,
        backgroundImage:
          "url('./src/assets/img/Template/animal-4758004_1920.jpg')",
        backgroundSize: "cover",
        "&.css-r92vv6": {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}>
      {/* ? là optional channing: để kiểm tra dữ liệu  */}
      <BoardBar board={mockData?.board} />
      <Box
        sx={{
          "&.css-o9nd4w": {
            position: "relative",
          },
        }}>
        <BoardContent board={mockData?.board} />
      </Box>
    </Box>
  );
};

export default BoardPage;
