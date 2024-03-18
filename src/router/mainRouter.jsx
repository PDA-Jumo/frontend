import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/main/layout";
import RankLayout from "../pages/rank/layout";
import QuizLayout from "../pages/quiz/layout";
import CommunityLayout from "../pages/community/community";
import BookLayout from "../pages/book/book";
import StockLayout from "../pages/Stock/stock";
import PortfolioList from "../pages/rank/rankPortfolio";

export const mainRouter = [
  {
    path: "/",
    element: <MainLayout />,
  },

  {
    path: "/login",
    element: <MainLayout />,
  },

  {
    path: "/signup",
    element: <MainLayout />,
  },

  {
    path: "/rank",
    element: <RankLayout />,
  },
  {
    path: "/rank/portfolio", // TODO "/rank/:userId"로 수정할거임. 일단 동적으로 안받고 있으니까 이렇게 짜두겠음
    element: <PortfolioList />,
  },

  {
    path: "/quiz",
    element: <QuizLayout />,
  },

  {
    path: "/community",
    element: <CommunityLayout />,
  },
  {
    path: "/book",
    element: <BookLayout />,
  },
  {
    path: "/stock",
    element: <StockLayout />,
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
