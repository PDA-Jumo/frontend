import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/main/layout";
import RankLayout from "../pages/rank/layout";
import QuizLayout from "../pages/quiz/layout";
import CommunityLayout from "../pages/community/community";
import BookLayout from "../pages/book/book";
import StockPage from "../pages/Stock/Stock";

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
    path: "/signuo",
    element: <MainLayout />,
  },

  {
    path: "/rank",
    element: <RankLayout />,
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
    element: <StockPage />,
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
