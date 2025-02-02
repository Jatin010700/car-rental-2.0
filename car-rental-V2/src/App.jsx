import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "./components/user_account/login";
import Register from "./components/user_account/register";
import { ForgotPass } from "./components/user_account/forgot_Pass";
import { ConfirmEmail } from "./components/user_account/confirm_Email";

import { Home } from "./components/main_page/mainPage";
import { Info1 } from "./components/sub_page/more_info";
import { Contact } from "./components/sub_page/contact";

import { Error } from "./extra/404Error";
import { Soon } from "./extra/Coming_Soon";

import { SearchCar } from "./components/sub_page/product_page/car_product";
import { CarOwner } from "./components/user_account/owner_upload_data/upload_data";
import { AuthProvider } from "./extra/authContext";
import PrivateRoute from "./extra/privateRoute";
import { UnauthorizedPage } from "./extra/unauthorize";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/info1/:carName/:imageURL/:price/:rent/:loginUserName" element={<Info1 />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/carlist" element={<SearchCar />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />

          <Route path="/carcontent"
          element={<PrivateRoute element={CarOwner} />}/>
          <Route path="/forgotPass"
          element={<PrivateRoute element={ForgotPass} />}/>
          <Route path="/ConfirmEmail" element={<ConfirmEmail/>}/>

          <Route path="*" element={<Error />} />
          <Route path="/soon" element={<Soon />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;