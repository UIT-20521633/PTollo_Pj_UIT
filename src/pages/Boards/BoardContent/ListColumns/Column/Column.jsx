import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloudIcon from "@mui/icons-material/Cloud";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import AddCardIcon from "@mui/icons-material/AddCard";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "~/utils/sorts";
//dnd-kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({ column }) => {
  //dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });
  const dndKitColumnStyles = {
    /**
     * Nếu sử dụng CSS.Transform như docs sẽ bị lỗi kiểu stretch
     */
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    //Chiểu cao phải luôn max là 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua 1 column dài thì ta phải kéo ở khu vực giữa rất khó chịu và khó kéo và lưu ý lúc này phải kết hợp với {...listeners} nằm ở Box chứ không phải ở div ngoài cũng để tránh kéo vào vùng không có nội dung
    height: "100%",
    //Nếu đang kéo thả thì opacity sẽ giảm nhờ isDragging là đang kéo
    opacity: isDragging ? 0.5 : undefined,
  };
  //dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Sắp xếp thứ tự các card
  const sortedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  return (
    //Bọc div ở đây vi vấn đề chiều cao của column khi kéo thả sẽ có bug kiểu kiểu flickering
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        //listeners là các sự kiện kéo thả của dnd-kit nên đặt trong box nếu đặt ngoài thì hegith là 100% r sẽ
        //phần không có nội dung ở dưới thẻ điv vẫn kéo thả được nên đặt listeners trong box
        {...listeners}
        sx={{
          minWidth: "300px",
          minHeight: "300px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A1D20" : "#f1f2f4",
          backgroundSize: "cover",
          ml: 2,
          backgroundPosition: "center",
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.Ptollo.boardContentHeight} - ${theme.spacing(3.5)})`,
        }}>
        {/* Header */}
        <Box
          sx={{
            px: 2,
            height: (theme) => theme.Ptollo.columnHeaderHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <MoreHorizRoundedIcon
                sx={{ cursor: "pointer", color: "text.primary" }}
                id="basic-column-menu"
                aria-controls={open ? "basic-menu-column" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-menu",
              }}>
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <CloudIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Card */}
        <ListCards cards={sortedCards} />

        {/* Footer */}
        <Box
          sx={{
            height: (theme) => theme.Ptollo.columnFooterHeight,
            display: "flex",
            alignItems: "center",
            px: 2,
            justifyContent: "space-between",
          }}>
          <Button sx={{ fontSize: "0.875rem" }} startIcon={<AddCardIcon />}>
            Add new card
          </Button>
          <Tooltip title="Drag to move">
            <DragHandleIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default Column;
