import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  broadcastRoomIdToUsers,
  createNewCallAPI,
  joinRoomCallAPI,
} from "~/apis";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCallInfo } from "~/redux/activieCall/callSlice";
import { socketIoInstance } from "~/socketClient";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import {
  ROOM_ID_RULE,
  ROOM_ID_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
} from "~/utils/validators";
import { selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";
import { selectCurrentUser } from "~/redux/user/userSlice";

const CallGroupBoard = ({ userCall }) => {
  const [loading, setLoading] = useState(false); // Loading state
  const [anchorEl, setAnchorEl] = useState(null); // For Menu anchor position
  const navigate = useNavigate(); // Navigation hook
  const dispatch = useDispatch();
  //Lấy danh sách thành viên từ board hiện tại
  const board = useSelector(selectCurrentActiveBoard);
  const currentUser = useSelector(selectCurrentUser);
  //Lọc ra những thành viên nào không phải là người tạo ra board
  const boardMembersIds = board.FE_allUsers.map((user) => user._id);
  const boardMembersIdsExceptCreator = boardMembersIds.filter(
    (memberId) => memberId !== currentUser._id
  );
  // Function to create a new room
  const handleCreateRoom = async () => {
    if (loading) return;
    setLoading(true); // Set loading state to true
    const newCallData = {
      userId: userCall._id,
      userName: userCall.username,
    };
    try {
      const { roomId, token } = await createNewCallAPI(newCallData);

      if (roomId && token) {
        dispatch(setCallInfo({ roomId: roomId, token: token }));
        socketIoInstance.emit("FE_SEND_ROOMID_TO_USERS", {
          roomId,
          token,
          boardMembersIdsExceptCreator,
        });
        navigate(`/call/${roomId}`);
      } else {
        toast.error("Failed to create room. Missing call information.");
      }
    } catch (error) {
      toast.error("Error creating room.");
      console.error("Error:", error); // Log the error to console for better debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to join a room
  const handleJoinRoom = async (roomId) => {
    if (loading) return;
    setLoading(true); // Set loading state to true
    const newCallData = {
      roomId: roomId,
      userId: userCall._id,
    };
    try {
      const { roomId, token } = await joinRoomCallAPI(newCallData);
      if (roomId && token) {
        dispatch(setCallInfo({ roomId: roomId, token: token }));
        navigate(`/call/${roomId}`);
      } else {
        toast.error("Failed to join room. Missing call information.");
      }
    } catch (error) {
      toast.error("Error creating room.");
      console.error("Error:", error); // Log the error to console for better debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Open the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  //Popover Tạo phòng
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null);
  const isOpenPopover = Boolean(anchorPopoverElement);
  const popoverId = isOpenPopover ? "invite-board-user-popover" : undefined;
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
    else setAnchorPopoverElement(null);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const submitCreateRoomCall = (data) => {
    const { callRoomId } = data;
    // Gọi API để gửi roomid đến các user khác ngoài nguời tạo ra room
    // broadcastRoomIdToUsers({ callRoomId }).then((data) => {
    //   // Clear thẻ input sử dụng react-hook-form bằng setValue, đồng thời đóng popover lại
    //   setValue("callRoomId", null);
    //   setAnchorPopoverElement(null);
    //   //gửi/emit roomId sự kiện socket lên server (tính năng real-time) > FE_USER_INVITED_TO_BOARD
    //   // để server gửi thông tin roomid đến người dùng để nhận roomId join vào thông qua socket io instance
    //   //emit là gửi sự kiện lên server thông qua socket io instance
    //   // socketIoInstance.emit("FE_SEND_ROOMID_TO_USERS", data);
    // });
    // handleJoinRoom(callRoomId);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Tooltip and Video Call Icon */}
      <Tooltip title="Create or Join Room">
        <Button
          onClick={handleClick} // Open menu
          variant="contained"
          startIcon={<VideoCallSharpIcon sx={{ ml: 0 }} />}
          sx={{
            textTransform: "none",
            "&:hover": { borderColor: "white" },
          }}>
          Room Options
        </Button>
      </Tooltip>

      {/* Menu for room options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}>
        <MenuItem
          onClick={() => {
            handleCreateRoom(); // Join existing room
            handleClose(); // Close the menu
          }}
          disabled={loading}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Create Room
        </MenuItem>
        <MenuItem
          aria-describedby={popoverId}
          onClick={
            () => {
              handleJoinRoom();
              handleClose();
            }
            // handleTogglePopover )
          }
          disabled={loading}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Join Room
        </MenuItem>
      </Menu>
      {/* Popover Tạo phòng */}
      <Box>
        {/* Khi Click vào Create Room ở trên thì sẽ mở popover */}
        <Popover
          id={popoverId}
          open={isOpenPopover}
          anchorEl={anchorPopoverElement}
          onClose={handleTogglePopover}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}>
          <form
            onSubmit={handleSubmit(submitCreateRoomCall)}
            style={{ width: "320px" }}>
            <Box
              sx={{
                p: "15px 20px 20px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}>
              <Typography
                variant="span"
                sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Join Room Call by Room Id
              </Typography>
              <Box>
                <TextField
                  autoFocus
                  fullWidth
                  label="Enter room id to join room call..."
                  type="text"
                  variant="outlined"
                  {...register("callRoomId", {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: ROOM_ID_RULE,
                      message: ROOM_ID_RULE_MESSAGE,
                    },
                  })}
                  error={!!errors["callRoomId"]}
                />
                <FieldErrorAlert errors={errors} fieldName={"callRoomId"} />
              </Box>
              <Box sx={{ alignSelf: "flex-end" }}>
                <Button
                  className="interceptor-loading"
                  type="submit"
                  variant="contained"
                  color="info">
                  Join Room
                </Button>
              </Box>
            </Box>
          </form>
        </Popover>
      </Box>
    </div>
  );
};

export default CallGroupBoard;
