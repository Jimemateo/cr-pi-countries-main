import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage.jsx";
import Home from "./components/views/HomePage/HomePage.jsx";
import ActivityPost from "./components/CardsActivities/ActivityPost.jsx";
import CountryDetail from "./components/Detail/CountryDetail.jsx";
import ActivitiesSearchView from "./components/views/ActivitiesPage/activitiesSearchView.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<ActivityPost />} />
        <Route path="/detail/:id" element={<CountryDetail />} />
        <Route path="/activities-search" element={<ActivitiesSearchView />} />
      </Routes>
    </>
  );
}

export default App;
