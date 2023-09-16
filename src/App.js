import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import Layout from "./components/Auth/Layout";
import LoadingSkeleton from "./pages/LoadingSkeleton";
import { Register } from "./components/Auth/Register";
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./components/Home"));
const CardDetails = lazy(() => import("./components/CardDetails"));
const History = lazy(() => import("./components/History"));

function App() {
  return (
    <div className="">
      {/* LAYOUT OF THE APP */}
      <BrowserRouter>
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />

            <Route
              path="hotel-details/:slug"
              element={
                <Layout>
                  <CardDetails />
                </Layout>
              }
            />

            <Route
              path="/history"
              element={
                <Layout>
                  <History />
                </Layout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
