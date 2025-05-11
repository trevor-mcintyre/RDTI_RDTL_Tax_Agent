import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow p-6 space-y-3 ${className}`.trim()}>
      {title && (
        <div className="border-b pb-2 mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;