import React, { useState } from "react";

interface CheckBoxProps {
  checked?: boolean;
  setChecked?(checked: boolean): void;
}

const CheckBox = ({ checked = false, setChecked }: CheckBoxProps) => {
  return (
    <div
      className="checkContainer mr-3 w-5 h-5 flex items-center justify-center"
      onClick={() => setChecked && setChecked(!checked)}
    >
      <div className="checkIcon">{checked && "✔︎"}</div>
    </div>
  );
};

export default CheckBox;
