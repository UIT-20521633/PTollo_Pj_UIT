import { useEffect, useState } from "react";
import moment from "moment";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DoneIcon from "@mui/icons-material/Done";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvitationsAPI,
  selectCurrentNotifications,
  updateBoardInvitationAPI,
  addNotification,
} from "~/redux/notifications/notificationsSlice";
import { socketIoInstance } from "~/socketClient";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { joinRoomCallAPI } from "~/apis";
import { setCallInfo } from "~/redux/activieCall/callSlice";
import { toast } from "react-toastify";

const BOARD_INVITATION_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};
const JOIN_ROOM_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  //Lấy thông tin user hiện tại đang đăng nhập trong redux store
  const userCall = useSelector(selectCurrentUser);
  const open = Boolean(anchorEl);
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget);
    //Khi click vào icon thông báo thì sẽ cập nhật trạng thái không có thông báo mới
    setNewNotification(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //Biến state để xác định có thông báo mới hay không
  const [newNotification, setNewNotification] = useState(false);

  //Lấy dữ liệu notifications từ redux store
  const notifications = useSelector(selectCurrentNotifications);

  //Fetch (get) danh sách các lời mời invitations từ server
  const dispatch = useDispatch();

  //Lấy thông tin user hiện tại đang đăng nhập trong redux store
  const currentUser = useSelector(selectCurrentUser);

  //Hook để chuyển hướng trang
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchInvitationsAPI());

    //Tạo func xử lý khi nhận được sự kiện realtime thông qua socket
    const onReceiveNewInvitation = (invitation) => {
      //Nếu user đang đăng nhập hiện tại mà chúng ta lưu trong redux chính là invitee(được mời) trong bản ghi invitation thì mới hiển thị thông báo mời tham gia board
      if (invitation.inviteeId === currentUser._id) {
        //B1: Thêm bản ghi invatation mới vào trong redux
        dispatch(addNotification(invitation));
        //B2: Câp nhật trạng thái đang có thông báo mới đến
        setNewNotification(true);
      }
    };
    // Lắng nghe sự kiện từ backend
    const onReceiveRoomIdNotification = (data) => {
      console.log("Received data from server:", data);
      if (data?.userId === currentUser._id) {
        if (data?.roomId) {
          // Thêm thông báo vào Redux store hoặc hiển thị ngay trong UI
          const roomNotification = {
            inviter: { displayName: "System" },
            board: { title: "Group Call Room" },
            roomId: data.roomId,
            createdAt: new Date().toISOString(),
          };

          dispatch(addNotification(roomNotification)); // Lưu thông báo vào Redux
          setNewNotification(true); // Đánh dấu có thông báo mới
        }
      }
    };
    //Lắng nghe 1 cái event realtime có tên là BE_USER_INVITED_TO_BOARD từ server gửi về
    socketIoInstance.on("BE_USER_INVITED_TO_BOARD", onReceiveNewInvitation);
    socketIoInstance.on("BE_SEND_ROOMID_TO_USERS", onReceiveRoomIdNotification);

    // clean up sự kiện để ngăn chặn việc bị đăng ký lặp lại sự kiện khi component bị render lại
    return () => {
      socketIoInstance.off("BE_USER_INVITED_TO_BOARD", onReceiveNewInvitation);
      socketIoInstance.off(
        "BE_SEND_ROOMID_TO_USERS",
        onReceiveRoomIdNotification
      );
    };
  }, [dispatch, currentUser._id]); //dispatch là một dependency của useEffect nên phải để vào mảng dependency để useEffect chạy lại khi dispatch thay đổi giá trị nghĩa là khi fetchInvitationsAPI() được gọi thì useEffect sẽ chạy lại để lấy dữ liệu mới từ redux store và hiển thị lên giao diện người dùng thông qua notifications ở trên giao diện người dùng sẽ hiển thị thông báo mời tham gia board

  //Cập nhật trạng thái - status của 1 lời mời join board
  const updateBoardInvitation = (status, invitationId) => {
    // console.log("status: ", status);
    // console.log("invitationId: ", invitationId);
    dispatch(updateBoardInvitationAPI({ status, invitationId })).then((res) => {
      if (
        res.payload.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED
      ) {
        navigate(`/board/${res.payload.boardInvitation.boardId}`);
      }
    });
  };
  // console.log(newNotification);

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
  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="secondary"
          // variant="none"
          // variant="dot"
          variant={newNotification ? "dot" : "none"}
          sx={{ cursor: "pointer" }}
          id="basic-button-open-notification"
          aria-controls={open ? "basic-notification-drop-down" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickNotificationIcon}>
          <NotificationsOutlinedIcon
            sx={{
              color: newNotification ? "yellow" : "none",
            }}
          />
        </Badge>
      </Tooltip>
      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button-open-notification" }}>
        {(!notifications || notifications.length === 0) && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {notifications?.map((notifications, index) => (
          <Box key={index}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: "auto",
              }}>
              <Box
                sx={{
                  maxWidth: "100%",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}>
                {/* Nội dung của thông báo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box>
                    <GroupAddIcon fontSize="small" />
                  </Box>
                  <Box>
                    <strong>{notifications.inviter.displayName}</strong>{" "}
                    {notifications.roomId
                      ? "had invited you to join the group call room "
                      : "had invited you to join the board "}
                    <strong>{notifications.board.title}</strong>
                  </Box>
                </Box>
                {/* Hiển thị roomid nếu có */}
                {notifications.roomId && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2">
                      Room ID: <strong>{notifications.roomId}</strong>
                    </Typography>
                    {/* Button để tham gia room */}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleJoinRoom(notifications.roomId)}>
                      Join Room
                    </Button>
                  </Box>
                )}
                {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                {notifications.boardInvitation?.status ===
                  BOARD_INVITATION_STATUS.PENDING && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "flex-end",
                    }}>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() =>
                        updateBoardInvitation(
                          BOARD_INVITATION_STATUS.ACCEPTED,
                          notifications._id
                        )
                      }>
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() =>
                        updateBoardInvitation(
                          BOARD_INVITATION_STATUS.REJECTED,
                          notifications._id
                        )
                      }>
                      Reject
                    </Button>
                  </Box>
                )}
                {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "flex-end",
                  }}>
                  {notifications.boardInvitation?.status ===
                    BOARD_INVITATION_STATUS.ACCEPTED && (
                    <Chip
                      icon={<DoneIcon />}
                      label="Accepted"
                      color="success"
                      size="small"
                    />
                  )}
                  {notifications.boardInvitation?.status ===
                    BOARD_INVITATION_STATUS.REJECTED && (
                    <Chip
                      icon={<NotInterestedIcon />}
                      label="Rejected"
                      color="error"
                      size="small"
                    />
                  )}
                </Box>

                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="span" sx={{ fontSize: "13px" }}>
                    {moment(notifications.createdAt).format("llll")}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== notifications?.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  );
}

export default Notifications;
