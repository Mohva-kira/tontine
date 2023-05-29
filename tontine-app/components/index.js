import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import Nearbyjobs from "./home/nearby/Nearbyjobs";
import PopularTontines from "./home/popular/PopularTontine";
import { default as HomeFooter} from "./home/footer/Footer";
import WelcomeCard from "./common/cards/welcome/WelcomeCard";

import ProtectedRoute from "./common/ProtectedRoute";

// job details screen
import Company from "./jobdetails/company/Company";
import { default as JobTabs } from "./jobdetails/tabs/Tabs";
import { default as JobAbout } from "./jobdetails/about/About";
import { default as JobFooter } from "./jobdetails/footer/Footer";

import AccountCard from "./common/cards/account/AccountCard";
import TontineCard from "./common/cards/tontine/TontineCard";

import Field from "./field/Field";

import Specifics from "./jobdetails/specifics/Specifics";

// common
import NearbyJobCard from "./common/cards/nearby/NearbyJobCard";
import Dropdown from "./dropdown/Dropdown";
import SidebarProfile from "./sidebarProfile/SidebarProfile";
import Popup from "./popup/Popup";
import Payment from "./jobdetails/payment/Payment";

export {
  ScreenHeaderBtn,
  Welcome,
  Nearbyjobs,
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics,
  NearbyJobCard,
  HomeFooter,
  Field,
  WelcomeCard,
  PopularTontines,
  AccountCard,
  Dropdown,
  SidebarProfile,
  TontineCard,
  Popup,
  ProtectedRoute,
  Payment

};
