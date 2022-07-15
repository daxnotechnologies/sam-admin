import { Route, Routes } from "react-router-dom";
import Users from "./Pages/Users";
import MainPage from "./Pages/MainPage";
import Dashboard from "./Pages/Dashboard";
import Groups from "./Pages/Groups";
import Transactions from "./Pages/Transactions";
import Settings from "./Pages/Settings";
import EditUser from "./Components/DisplayItems/EditUser";
import EditTransaction from "./Components/DisplayItems/EditTransaction";
import EditGroup from "./Components/DisplayItems/EditGroup";
import Login from "./Pages/Login";
import AllCategories from "./Pages/AllCategories";
import AddCategory from "./Pages/AddCategory";
import AllApps from "./Pages/AllApps";
import FeaturedApps from "./Pages/FeaturedApps";
import AddApp from "./Pages/AddApp";
import EditCategory from "./Components/DisplayItems/EditCategory";
import EditApp from "./Components/DisplayItems/EditApp";
import UsersAppsRequests from "./Pages/UsersAppsRequests";
import AddFeatureApp from "./Pages/AddFeatureApp";
import { useState } from "react";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {true && (
          <Route path="/dashboard" element={<MainPage />}>
            <Route index element={<AllCategories />} />
            <Route
              path="/dashboard/user-app-requests"
              element={<UsersAppsRequests />}
            />
            <Route path="/dashboard/categories" element={<AllCategories />} />
            <Route path="/dashboard/all-apps" element={<AllApps />} />
            <Route path="/dashboard/featured-apps" element={<FeaturedApps />} />

            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/add-category" element={<AddCategory />} />
            <Route path="/dashboard/add-app" element={<AddApp />} />
            <Route
              path="/dashboard/add-featureapp/:id"
              element={<AddFeatureApp />}
            />
            <Route path="/dashboard/edit-app/:appId" element={<EditApp />} />
            <Route path="/dashboard/edit-user/:userId" element={<EditUser />} />
            <Route
              path="/dashboard/edit-category/:categoryId"
              element={<EditCategory />}
            />
          </Route>
        )}
        {/* <Route exact path="/*" element={<> Error 404 | Page Not found </>} /> */}
      </Routes>
    </>
  );
}

export default App;
