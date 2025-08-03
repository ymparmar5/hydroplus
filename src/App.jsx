import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
// import CategoryPage from "./Pages/CategoryPage";
import Error from "./Pages/Error";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductInfo from "./Pages/ProductInfo";
import ScrollTop from "./Components/ScrollTop";

import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import MyState from "./Context/MyState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./Components/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./Components/ProtectedRouteForAdmin";
import Signup from "./Pages/SIgnup";
import SignIN from "./Pages/SignIn";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Certificates from "./Pages/Certificates";
import SocialSidebar from "./Components/SocialSidebar";
import Subcategory from "./Pages/Subcategory";
import Exhibitions from "./Pages/exhibitions";
import AddUpdateImage from "./Components/Admin/AddUpdateImage";
import AddOrUpdateProductPage from "./Components/Admin/AddOrUpdateProductPage";

const App = () => {


  return (

    <MyState >
      <BrowserRouter>
        <Header />

        <ScrollTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/subcategory/:category" element={<Subcategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIN />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tandc" element={<TermsAndConditions />} />
          <Route path="/exhibitions" element={<Exhibitions />} />


          <Route path="/user" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />

          <Route path="/admin" element={
            <ProtectedRouteForAdmin >
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/AddUpdateImage" element={
            <ProtectedRouteForAdmin >
              <AddUpdateImage />
            </ProtectedRouteForAdmin>} />

          <Route path="/AddProductPage" element={
            <ProtectedRouteForAdmin>
              <AddOrUpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/AddProductPage/:id" element={
            <ProtectedRouteForAdmin>
              <AddOrUpdateProductPage />
            </ProtectedRouteForAdmin>
          } />


          <Route path="/error" element={<Error />} />
        </Routes>
        <SocialSidebar />
        <Footer />
        <Toaster />

      </BrowserRouter>
    </MyState>
  );
};

export default App;
