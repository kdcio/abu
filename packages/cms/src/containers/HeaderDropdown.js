import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { useAuth } from "context/auth";

const HeaderDropdown = () => {
  const history = useHistory();
  const { logout, user } = useAuth();

  const onLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-user" className="mfe-2" />
        <span
          id="full-name"
          className="d-none d-md-inline"
        >{`${user.given_name} ${user.family_name}`}</span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={onLogout} id="logout">
          <CIcon id="logout" name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HeaderDropdown;
