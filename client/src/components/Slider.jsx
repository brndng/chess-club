import React from "react";

const Slider = props => {
  const { handleChange } = props;
  return (
    <div className="switch-container">
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={true}
          onChange={() => handleChange()}
        />
        <span className="slider round" />
      </label>
    </div>
  );
};

export default Slider;
