import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/main/layout";
import RankLayout from "../pages/rank/layout";
import QuizLayout from "../pages/quiz/layout";
import CommunityLayout from "../pages/community/community";
import BookLayout from "../pages/book/book";
import StockPage from "../pages/Stock/Stock";
import StockDetails from "../components/stock/WorldStockDetails";
import MyStockSelector from "../components/stock/MyStockSelector";
import StockDetail from "../components/stock/StockDetail";
import TestLayout from "../pages/test/test";
import TestResultLayout from "../pages/test/testResult";
import MyStock from "../components/stock/myStock";
import StockDetail from "../components/stock/StockDetail";

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
    children: [
      {
        path: "",
        element: <StockDetails />,
        index: true,
      },
      {
        path: "worldstock",
        element: <StockDetails />,
        index: true,
      },
      {
        path: "myportfolio",
        element: <MyStockSelector />,
        index: true,
      },
      {
        path: ":stockId",
        element: <StockDetail />,
        index: true,
      },
    ],
  },

  {
    path: "/test/result",
    element: <TestResultLayout />,
  },
  {
    path: "/stock/detail",
    element: <StockDetail />,
  },
];
const router = createBrowserRouter(mainRouter);
export default router;
