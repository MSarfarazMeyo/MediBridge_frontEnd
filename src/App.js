import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comments from "./pages/admin/screens/comments/Comments";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPost from "./pages/admin/screens/posts/EditPost";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import BlogPage from "./pages/blog/BlogPage";
import { AboutUsPage } from "./pages/aboutUS/AboutUsPage";
import { ContactUsPage } from "./pages/contactUs/ContactUsPage";
import { FaqPage } from "./pages/faq/FaqPage";
import { PricingPage } from "./pages/pricing/PricingPage";
import DoctorPage from "./pages/doctor/DoctorPage";
import DoctorDetailPage from "./pages/articleDetail copy/DoctorDetailPage";
import EditDoctor from "./pages/admin/screens/doctor/EditDoctor";
import ManageDoctors from "./pages/admin/screens/doctor/ManageDoctors";
import ManageManagers from "./pages/admin/screens/manager/ManageManagers";
import EditManager from "./pages/admin/screens/manager/EditManager";
import ManagerLayout from "./pages/admin/screens/ManagerLayout";
import Requests from "./pages/admin/screens/requests/Requests";
import { useContext } from "react";
import ChatContext from "./services/chat-service";
import ChatScreen from "./pages/chat/ChatScreen";

function App() {
  const chat = useContext(ChatContext);

  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />

        <Route path="/chat" element={<ChatScreen />} />

        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/doctor/:slug" element={<DoctorDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="/admin/chat" element={<ChatScreen />} />

          <Route path="/admin/doctors/manage" element={<ManageDoctors />} />
          <Route path="/admin/doctor/profile" element={<EditDoctor />} />

          <Route path="/admin/manager/manage" element={<ManageManagers />} />
          <Route path="/admin/manager/profile" element={<EditManager />} />

          <Route path="categories/manage" element={<Categories />} />
          <Route
            path="categories/manage/edit/:slug"
            element={<EditCategories />}
          />
          <Route path="users/manage" element={<Users />} />
        </Route>
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Admin />} />
          <Route path="requests" element={<Requests />} />
          <Route path="/manager/chat" element={<ChatScreen />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
