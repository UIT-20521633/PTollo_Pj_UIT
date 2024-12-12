import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card as MuiCard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";
import CardActions from "@mui/material/CardActions";
import {
  updateCurrentActiveCard,
  showModalActiveCard,
} from "~/redux/activeCard/activeCardSlice";
import { useDispatch } from "react-redux";

//dnd-kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CardBoard = ({ card }) => {
  const dispatch = useDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });
  const dndKitCardStyles = {
    /**
     * Nếu sử dụng CSS.Transform như docs sẽ bị lỗi kiểu stretch
     */
    // touchAction: "none",//dùng cho sensor PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "2px solid #fd79a8" : undefined,
  };

  const showCardAction = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };
  const setActiveCardToRedux = () => {
    //Cập nhật data cho activeCard trong redux
    dispatch(updateCurrentActiveCard(card));
    //Hiện Moidal ActiveCard lên
    dispatch(showModalActiveCard());
  };
  return (
    <MuiCard
      //Kiểm tra xem đã click vào card chưa để mở active card
      onClick={setActiveCardToRedux}
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,.5)",
        overflow: "unset",
        display: card?.FE_PlaceholderCard ? "none" : "block",
        border: "1px solid transparent",
        "&:hover": { border: "1px solid #fd79a8" },
        //overflow: card?.FE_PlaceholderCard ? "hidden" : "unset",
        //height: card?.FE_PlaceholderCard ? "0" : "unset",
      }}>
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title="green iguana"
        />
      )}
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography
          sx={{
            fontSize: "0.875rem",
          }}>
          {card?.title}
        </Typography>
      </CardContent>
      {showCardAction && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default CardBoard;
