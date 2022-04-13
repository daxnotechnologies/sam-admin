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

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<MainPage />}>
          <Route index element={<AllCategories />} />
          <Route path="/dashboard/add-category" element={<AddCategory />} />
          <Route path="/dashboard/all-apps" element={<AllApps />} />
          <Route path="/dashboard/featured-apps" element={<FeaturedApps />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/edit-user/:userId" element={<EditUser />} />

          {/* <Route path="/dashboard/tutor-details" element={<TutorDetails />} />
          <Route path="/dashboard/add-job" element={<AddJob />} />
          <Route path="/dashboard/jobs-applied" element={<JobsApplied />} />
          <Route path="/dashboard/jobs-details" element={<JobsDetails />} />
          <Route path="/dashboard/feedback" element={<Feedback />} /> */}
          {/* <Route path="/dashboard/groups" element={<Groups />} />
          <Route
            path="/dashboard/edit-group/:groupId"
            element={<EditGroup />}
          />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route
            path="/dashboard/edit-transaction/:transactionId"
            element={<EditTransaction />}
          />
          <Route path="/dashboard/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
