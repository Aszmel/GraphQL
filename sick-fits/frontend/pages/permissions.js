import PleaseSignIn from "../components/PleaseSignIn";
import Permissions from "../components/Permissions";
import { ALL_USERS_QUERY } from "../components/User";

const PermissionsPage = props => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;
