import React from "react";
import { createBrowserRouter } from "react-router-dom";

import UserLayout from "../pages/user/layout";
import StartPage from "../pages/user/start/page";
import SignInPage from "../pages/user/signin/page";
import SignUpPage from "../pages/user/signup/page";
import HomeLayout from "../pages/home/layout";
import HomePage from "../pages/home/page";

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
import PortfolioList from "../pages/rank/rankPortfolio";

export const mainRouter = [
  {
    path: "",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <StartPage />,
        index: true,
      },
      {
        path: "/signin",
        element: <SignInPage />,
        index: true,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
        index: true,
      },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
        index: true,
      },
    ],
  },
  {
    path: "/ranking",
    element: <RankLayout />,
  },
  {
    path: "/ranking/:userId",

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
        path: "detail/:stockId/:stockName",
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
  {
    path: "/test",
    element: <TestLayout />,
  },
  {
    path: "/test/result",
    element: <TestResultLayout />,
  },
];
const router = createBrowserRouter(mainRouter);
export default router;
