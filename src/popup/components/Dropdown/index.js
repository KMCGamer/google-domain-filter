import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownMenuItem from "./DropdownMenuItem";
import DropdownMenu from "./DropdownMenu";

function Dropdown({ trigger, items }) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  const renderTrigger = () => {
    const triggerElement = trigger(isMenuShowing);

    return React.cloneElement(triggerElement, {
      ref: setReferenceElement,
      onClick: () => {
        setIsMenuShowing((isMenuShowing) => !isMenuShowing);
      },
    });
  };

  return (
    <>
      {renderTrigger()}
      {isMenuShowing && (
        <DropdownMenu
          referenceElement={referenceElement}
          onOutsideClick={() => {
            setIsMenuShowing(false);
          }}
        >
          {items.map((item, idx) => (
            <DropdownMenuItem
              key={idx}
              text={item.text}
              onClick={() => {
                item.onClick();
                setIsMenuShowing(false);
              }}
            />
          ))}
        </DropdownMenu>
      )}
    </>
  );
}

Dropdown.propTypes = {
  trigger: PropTypes.func.isRequired,
  items: PropTypes.array,
};

export default Dropdown;
