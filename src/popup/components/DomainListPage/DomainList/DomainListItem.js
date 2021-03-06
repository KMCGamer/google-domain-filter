import React, { useState, useRef } from "react";
import styled from "styled-components";
import { DragHandleIcon } from "../../../icons";
import { Draggable } from "react-beautiful-dnd";
import DomainListItemDropdown from "./DomainListItemDropdown";
import validator from "validator";
import { replaceStringInArray } from "../../../../utils";
import DomainListItemInput from "./DomainListItemInput";
import DomainListItemEditOptions from "./DomainListItemEditOptions";

function DomainListItem({ domain, index, isDraggingOver, setDomains }, ref) {
  const [inputText, setInputText] = useState(domain);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  const cancelEdit = () => {
    setInputText(domain);
    setIsEditing(false);
  };

  const startEdit = () => {
    setIsEditing(true);
    inputRef.current.focus();
  };

  const editDomain = () => {
    if (!validator.isFQDN(inputText)) {
      return;
    }

    if (domain === inputText) {
      cancelEdit();
      return;
    }

    setDomains((domainList) => {
      if (domainList.includes(inputText)) {
        return null;
      }

      const editedList = replaceStringInArray(domainList, domain, inputText);
      return editedList;
    });
  };

  return (
    <Draggable draggableId={domain} index={index}>
      {(provided, snapshot) => (
        <div ref={ref}>
          <StyledListItem
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onMouseEnter={() => {
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setIsHovering(false);
            }}
          >
            <DomainListItemInput
              ref={inputRef}
              textState={[inputText, setInputText]}
              isEditingState={[isEditing, setIsEditing]}
              editDomain={editDomain}
            />

            {isEditing ? (
              <DomainListItemEditOptions
                editDomain={editDomain}
                cancelEdit={cancelEdit}
              />
            ) : (
              <DomainListItemDropdown
                domain={domain}
                setDomains={setDomains}
                showTrigger={isHovering && !isDraggingOver}
                startEdit={startEdit}
              />
            )}

            <DragHandle {...provided.dragHandleProps}>
              <DragHandleIcon />
            </DragHandle>
          </StyledListItem>
        </div>
      )}
    </Draggable>
  );
}

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  color: #333;
  font-size: 14px;
  padding: 8px 16px;
  border-bottom: ${({ isDragging }) => (isDragging ? "" : "1px solid #f7f7f7")};
  background: #fff;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0px 0px 15px rgba(0,0,0,.1)" : "none"};

  &:last-child {
    border: none;
  }
`;

const DragHandle = styled.div`
  color: #bbb;
  margin: 0 8px;
`;

export default React.forwardRef(DomainListItem);
