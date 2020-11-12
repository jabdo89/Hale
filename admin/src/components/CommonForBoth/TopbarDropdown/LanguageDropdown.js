import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

//i18n
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';

// falgs
import usFlag from "../../../assets/images/flags/us.jpg";
import spain from "../../../assets/images/flags/spain.jpg";

const LanguageDropdown = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [flag, setFlag] = useState(usFlag);
  const [lng, setLng] = useState("English");


   function changeLanguageAction(lng) {

     //set language as i18n
     i18n.changeLanguage(lng);

    if(lng === "sp")
    {
       setFlag(spain); 
      setLng('Spanish');
    }  
    else if(lng === "eng")
    {
        setFlag(usFlag); 
        setLng('English');
    }  
  }

  
  return (
     <React.Fragment>
        <Dropdown
          isOpen={menu}
          toggle={() => setMenu(!menu)}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item waves-effect"
            tag="button"
          >
            <img
              src={flag}
              alt="Skote"
              height="16"
              className="mr-1"
            />
               <span className="align-middle">{lng}</span>
          </DropdownToggle>
          <DropdownMenu className="language-switch" right>
            <DropdownItem tag="a" href="#" onClick={() => changeLanguageAction('eng')} className="notify-item">
              <img src={usFlag} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">English</span>
            </DropdownItem>
              <DropdownItem tag="a" href="#" onClick={() => changeLanguageAction('sp')} className="notify-item">
              <img src={spain} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Spanish</span>
            </DropdownItem>          
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
  );
}

export default withNamespaces()(LanguageDropdown);