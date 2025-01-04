import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { fetchBoardDetailsAPI } from "~/redux/activeBoard/activeBoardSlice";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";

const TemplateDetail = () => {
  const { id } = useParams(); // Lấy ID của template từ URL
  const dispatch = useDispatch();
  const board = useSelector((state) => state.activeBoard.currentBoard); // Lấy thông tin board từ Redux

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      await dispatch(fetchBoardDetailsAPI(id)); // Gọi API để lấy dữ liệu của board
      setLoading(false); // Tắt trạng thái loading sau khi dữ liệu được tải
    };
    fetchBoardDetails();
  }, [dispatch, id]);

  if (loading || !board) {
    return <PageLoadingSpinner caption="Loading Template..." />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        background: board.background.startsWith("#")
          ? board.background
          : `url(${board.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Thanh công cụ của Board */}
      <BoardBar board={board} />
      {/* Nội dung chính của Board */}
      <BoardContent board={board} />
    </Box>
  );
};

export default TemplateDetail;
