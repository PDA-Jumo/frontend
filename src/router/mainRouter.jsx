import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/main/layout";
import RankLayout from "../pages/rank/layout";
import QuizLayout from "../pages/quiz/layout";
import CommunityLayout from "../pages/community/community";
import BookLayout from "../pages/book/book";
import StockPage from "../pages/Stock/Stock";
import TestLayout from "../pages/test/test";
import TestResultLayout from "../pages/test/testResult";

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
  {
    path: "/test/result",
    element: <TestResultLayout />,
  },
];
const router = createBrowserRouter(mainRouter);
export default router;
