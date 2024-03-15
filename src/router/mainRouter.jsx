import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../pages/user/layout";
import StartPage from "../pages/user/start/page";
import SignInPage from "../pages/user/signin/page";
import SignUpPage from "../pages/user/signup/page";
import MainPage from "../pages/home/page";
import RankLayout from "../pages/rank/layout";
import QuizLayout from "../pages/quiz/layout";
import CommunityLayout from "../pages/community/community";
import BookLayout from "../pages/book/book";
import StockLayout from "../pages/Stock/stock";

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
    path: "/main",
    element: <MainPage />,
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
    element: <StockLayout />,
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
