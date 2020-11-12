import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomForm = ({ status, message, onValidated }) => {
  const [id, setId] = useState(0);
  return (
    <div className="subscribe-form">
      <div className="mc-form">
        <div>
          <input
            className="email"
            type="text"
            onChange={({ target: { value } }) => setId(value)}
            placeholder="Enter your order id..."
          />
        </div>
        <div className="clear">
          <Link
            className="button"
            to={process.env.PUBLIC_URL + "/postCheckOut/" + id}
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

const SubscribeEmail = ({ mailchimpUrl }) => {
  return (
    <div>
      <CustomForm />
    </div>
  );
};

SubscribeEmail.propTypes = {
  mailchimpUrl: PropTypes.string,
};

export default SubscribeEmail;
