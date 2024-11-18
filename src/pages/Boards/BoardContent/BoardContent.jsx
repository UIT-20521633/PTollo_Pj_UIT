// Desc: BoardContent component of the Board page
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";

const BoardContent = ({ board }) => {
  const sortedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.Ptollo.boardContentHeight,
          position: "relative",
        }}>
        {/* Cột sau khi được thay đổi thứ tự kéo thả  */}
        <ListColumns columns={sortedColumns} />
      </Box>
    </>
  );
};
export default BoardContent;
