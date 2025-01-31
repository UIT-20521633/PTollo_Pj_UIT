import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import { selectOnlineUsers } from "~/redux/user/userSlice";
import { useSelector } from "react-redux";

function BoardUserGroup({ boardUsers = [], limit = 4 }) {
  /**
   * Xử lý Popover để ẩn hoặc hiện toàn bộ user trên một cái popup, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
   */
  const onlineUsers = useSelector(selectOnlineUsers); // Lấy thông tin user đang online
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null);
  const isOpenPopover = Boolean(anchorPopoverElement);
  const popoverId = isOpenPopover ? "board-all-users-popover" : undefined;
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
    else setAnchorPopoverElement(null);
  };

  // Lưu ý ở đây chúng ta không dùng Component AvatarGroup của MUI bởi nó không hỗ trợ tốt trong việc chúng ta cần custom & trigger xử lý phần tử tính toán cuối, đơn giản là cứ dùng Box và CSS - Style đám Avatar cho chuẩn kết hợp tính toán một chút thôi.
  return (
    <Box sx={{ display: "flex", gap: "2px" }}>
      {/* Hiển thị giới hạn số lượng user theo số limit */}
      {boardUsers.map((user, index) => {
        if (index < limit) {
          return (
            <Tooltip title={user?.displayName} key={index}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}>
                <Avatar
                  src={user?.avatar || "./assets/avatar.png"}
                  alt={user?.displayName}
                  sx={{
                    width: 35,
                    height: 35,
                    cursor: "pointer",
                  }}
                />
                {onlineUsers?.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </Box>
            </Tooltip>
          );
        }
      })}

      {/* Nếu số lượng users nhiều hơn limit thì hiện thêm +number */}
      {boardUsers.length > limit && (
        <Tooltip title="Show more">
          <Box
            aria-describedby={popoverId}
            onClick={handleTogglePopover}
            sx={{
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "50%",
              color: "white",
              backgroundColor: "#a4b0be",
            }}>
            +{boardUsers.length - limit}
          </Box>
        </Tooltip>
      )}

      {/* Khi Click vào +number ở trên thì sẽ mở popover hiện toàn bộ users, sẽ không limit nữa */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Box
          sx={{
            p: 2,
            maxWidth: "235px",
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}>
          {boardUsers.map((user, index) => (
            <Tooltip title={user?.displayName} key={index}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}>
                <Avatar
                  src={user?.avatar || "./assets/avatar.png"}
                  alt={user?.displayName}
                  sx={{
                    width: 35,
                    height: 35,
                    cursor: "pointer",
                  }}
                />
                {onlineUsers?.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  );
}

export default BoardUserGroup;
