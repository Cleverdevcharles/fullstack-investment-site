import React from "react";
import "react-phone-number-input/style.css";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/cart/Cart";
import ManageInvestmentPackages from "./dashboard/admin/investmentpackage/ManageInvestmentPackages";
import UpdateInvestmentPackage from "./dashboard/admin/investmentpackage/UpdateInvestmentPackage";
import History from "./dashboard/admin/orderHistory";
import Orders from "./dashboard/admin/Orders";
import Create__Site from "./dashboard/admin/site/Create__Site";
import Manage__Sites from "./dashboard/admin/site/Manage__Site";
import UpdateSite from "./dashboard/admin/site/Update__Site";
import UpdateAdminInfo from "./dashboard/admin/UpdateAdminInfo";
import UpdateUserInfo from "./dashboard/subscriber/UpdateUserInfo";
import AdminRoute from "./Routes/AdminRoute";

// Pages
const Home = React.lazy(() => import("./components/home/Home"));
const Login = React.lazy(() => import("./components/auth/login/Login"));
const Register = React.lazy(() =>
  import("./components/auth/register/Register")
);
const Activate = React.lazy(() =>
  import("./components/auth/activate/Activate")
);
const ForgetPassword = React.lazy(() =>
  import("./components/auth/forgotPassword/ForgetPassword")
);
// const ChangePassword = React.lazy(() =>
//   import("./components/auth/changePassword/ChangePassword")
// );
const ResetPassword = React.lazy(() =>
  import("./components/auth/resetPassword/ResetPassword")
);
// const Admin = React.lazy(() =>
//   import("./users/admin/views/dashboard/Dashboard")
// );
// const orderHistory = React.lazy(() =>
//   import("./users/admin/views/orderHistory/orderHistory")
// );
// const User = React.lazy(() =>
//   import("./users/subscriber/views/dashboard/Dashboard")
// );
// const Create__Site = React.lazy(() =>
//   import("./users/admin/views/site/Create__Site")
// );
// const Update__Site = React.lazy(() =>
//   import("./users/admin/views/site/Update__Site")
// );
// const Manage__Sites = React.lazy(() =>
//   import("./users/admin/views/site/Manage__Site")
// );
// const Create__Category = React.lazy(() =>
//   import("./users/admin/views/category/Create__Category")
// );
// const Update__Category = React.lazy(() =>
//   import("./users/admin/views/category/Update__Category")
// );
// const Manage__Categories = React.lazy(() =>
//   import("./users/admin/views/category/Manage__Categories")
// );
// const Create__Product = React.lazy(() =>
//   import("./users/admin/views/product/Create__Product")
// );
// const Manage__Products = React.lazy(() =>
//   import("./users/admin/views/product/Manage__Products")
// );
// const Update__Product = React.lazy(() =>
//   import("./users/admin/views/product/Update__Product")
// );
// const View__Profile = React.lazy(() => import("./users/profile/View__Profile"));
// const Update__Profile = React.lazy(() =>
//   import("./users/profile/Update__Profile")
// );
// const Shop = React.lazy(() => import("./components/shop/Shop"));
// const Product = React.lazy(() => import("./components/product/Product"));
// const Cart = React.lazy(() => import("./components/cart/Cart"));
// const Orders = React.lazy(() => import("./users/admin/views/orders/Orders"));
const About_Us = React.lazy(() => import("./components/navs/about/About_Us"));
const Investment = React.lazy(() =>
  import("./components/navs/investment/Investment")
);
const Contact_Us = React.lazy(() =>
  import("./components/navs/contact/Contact_Us")
);
const TermsConditions = React.lazy(() =>
  import("./components/navs/terms_conditions/TermsConditions")
);
const Review = React.lazy(() =>
  import("./components/navs/hero/Review")
);
const Admin = React.lazy(() => import("./dashboard/admin/Admin"));

const CreateInvestmentPackage = React.lazy(() =>
  import("./dashboard/admin/investmentpackage/CreateInvestmentPackage")
);
const AdminInfo = React.lazy(() => import("./dashboard/admin/AdminInfo"));
const Subscriber = React.lazy(() =>
  import("./dashboard/subscriber/Subscriber")
);
const UserInfo = React.lazy(() =>
  import("./dashboard/subscriber/UserInfo")
);

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const App = () => {
  return (
    <React.Suspense fallback={loading}>
      <span style={{ fontSize: "20px" }}>
        <ToastContainer />
      </span>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user-account-verify-:token" component={Activate} />
        <Route exact path="/users-password-forget" component={ForgetPassword} />
        <Route
          exact
          path="/users-password-reset-:token"
          component={ResetPassword}
        />
        {/* <Route exact path="/users/password/change" component={ChangePassword} />
        <Route exact path="/profile" component={View__Profile} />
        <Route exact path="/update/profile" component={Update__Profile} />
        <AdminRoute exact path="/admin/dashboard" component={Admin} />
        <AdminRoute exact path="/admin/order&pruchase/history" component={orderHistory} />
        <Route exact path="/user/dashboard" component={User} />
        <AdminRoute exact path="/admin/create-site" component={Create__Site} />
        <AdminRoute
          exact
          path="/admin/site/update/:siteId"
          component={Update__Site}
        />
        <AdminRoute exact path="/admin/sites" component={Manage__Sites} />
        <AdminRoute
          exact
          path="/admin/create-category"
          component={Create__Category}
        />
        <AdminRoute
          exact
          path="/admin/category/update/:categoryId"
          component={Update__Category}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={Manage__Categories}
        />
        <AdminRoute
          exact
          path="/admin/create-product"
          component={Create__Product}
        />
        <AdminRoute exact path="/admin/products" component={Manage__Products} />
        <AdminRoute
          exact
          path="/admin/product/update/:productId"
          component={Update__Product}
        />
        <AdminRoute path="/admin/orders" exact component={Orders} />

        <Route exact path="/shop" component={Shop} />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/cart" component={Cart} />*/}
        <Route exact path="/about" component={About_Us} />
        <Route exact path="/contact" component={Contact_Us} />
        <Route exact path="/investment" component={Investment} />
        <Route exact path="/reviews" component={Review} />
        <Route exact path="/terms-conditions" component={TermsConditions} />
        <AdminRoute exact path="/admin-dashboard" component={Admin} />
        <Route exact path="/dashboard" component={Subscriber} />
        <Route exact path="/dashboard-user-info" component={UserInfo} />
        <AdminRoute
          exact
          path="/admin-create-new-investment-package"
          component={CreateInvestmentPackage}
        />
        <AdminRoute
          exact
          path="/admin-investment-packages"
          component={ManageInvestmentPackages}
        />
        <AdminRoute
          exact
          path="/admin-update-investment-package-:investmentpackageId"
          component={UpdateInvestmentPackage}
        />
        <Route
          exact
          path="/investment-package-:investmentpackageId"
          component={Cart}
        />
        <Route path="/investment-history" exact component={History} />
        <AdminRoute path="/admin-investment-orders" exact component={Orders} />
        <AdminRoute
          exact
          path="/admin-dashboard-user-info"
          component={AdminInfo}
        />
        <AdminRoute
          exact
          path="/admin-dashboard-update-info-:userId"
          component={UpdateAdminInfo}
        />
        <Route
          exact
          path="/dashboard-update-info-:userId"
          component={UpdateUserInfo}
        />
        <AdminRoute
          exact
          path="/admin-create-site-details"
          component={Create__Site}
        />
        <AdminRoute
          exact
          path="/admin-site-details"
          component={Manage__Sites}
        />
        <AdminRoute
          exact
          path="/admin-site-update-:siteId"
          component={UpdateSite}
        />
      </Switch>
    </React.Suspense>
  );
};

export default App;
