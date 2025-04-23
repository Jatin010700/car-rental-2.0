import { Routes, Route } from "react-router-dom";

import UserLogin from "./components/pages/account/userLogin";
import Register from "./components/pages/account/register";
import { ForgotPass } from "./components/pages/account/reset_setting/forgot_Pass";
import { ConfirmEmail } from "./components/pages/account/reset_setting/confirm_Email";

import { Soon } from "./components/common/comingSoon";
import { AuthProvider } from "./auth/authContext";
import PrivateRoute from "./auth/privateRoute";
import { UnauthorizedPage } from "./errors/unauthorize";
import { Error } from "./errors/404Error";

import { CarOwner } from "./components/pages/owner_data/uploadData";
import { OwnerCarList } from "./components/pages/owner_data/ownerCarList";
import { HomePage } from "./components/pages/homepage/homePage";
import { ContactPage } from "./components/pages/contact/contactPage";
import { CarProduct } from "./components/pages/products/carProduct";
import { ProductPage } from "./components/pages/products/productInfo";

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/carlist" element={<CarProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<UserLogin />} />

          <Route path="/productPage/:carName/:imageURL/:price/:rent/:loginUserName" element={<ProductPage />}/>
          <Route path="/carcontent" element={<PrivateRoute element={CarOwner} />}/>
          <Route path="/ownerlist" element={<PrivateRoute element={OwnerCarList} />}/>
          <Route path="/forgotPass" element={<PrivateRoute element={ForgotPass} />}/>
          <Route path="/ConfirmEmail" element={<ConfirmEmail/>}/>

          <Route path="*" element={<Error />} />
          <Route path="/soon" element={<Soon />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;