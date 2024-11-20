import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
const ListColumns = ({ columns }) => {
  /**
   * SortableContext yêu cầu items là một mảng dạng ['id1', 'id2', 'id3', ...] chứ không phải là mảng object như columns [{_id: 'id1', ...}, {_id: 'id2', ...}, ...]
   * Nếu không đúng thì vẫn kéo thả được nhưng không có animation
   */
  return (
    <SortableContext
      items={columns?.map((col) => col._id)}
      strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          py: 2,
          height: "100%",
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
          position: "absolute",
          bottom: 0,
          right: 0,
          top: 0,
          left: 0,
          // Đảm bảo nội dung không xuống dòng
        }}>
        {/* Nội dung của bảng */}
        {columns?.map((column) => {
          return <Column key={column._id} column={column} />;
        })}
        <Box>
          <Box
            sx={{
              minWidth: "300px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A1D20" : "#f1f2f4",
              backgroundSize: "cover",
              mx: 2,
              backgroundPosition: "center",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A1D20" : "#f1f2f4",
              },
            }}>
            <Button
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
                textTransform: "none",
              }}
              startIcon={<AddBoxIcon />}>
              Add new column
            </Button>
          </Box>
        </Box>
      </Box>
    </SortableContext>
  );
};
export default ListColumns;
