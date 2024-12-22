import React, { JSX } from 'react';
import { Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

/**
 * @function EditAction
 * @description A component that renders an edit button for the given `entityId`.
 * The button is disabled if the user doesn't have enough permissions to update the given `entityId`.
 * The button is also disabled if the component is in a loading state.
 * When the button is clicked, the `onEdit` function will be called with the given `entityId`.
 * @param props The props for the component
 * @param props.entityId The id of the entity to be updated
 * @param props.type The type of a button
 * @param props.showLabel Whether or not the component should show a label
 * @param props.isLoading Whether or not the component should be in a loading state
 * @param props.disabled Whether or not the component should be disabled
 * @param props.onEdit The callback function to be called when the button is clicked
 * @returns {JSX.Element} The JSX element of the component
 */
export const EditAction: React.FC = (props): JSX.Element => {
  const {
    entityId,
    type = 'primary',
    showLabel = false,
    isLoading = false,
    disabled = false,
    onEdit
  } = props;

  const { pathname } = window.location;

  /**
   * @function aClick
   * @description Prevents the default link behavior and stops the event propagation.
   * This is useful when we want to handle the click event manually.
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e The event object
   * @returns {void}
   */
  const aClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault();
  };

  return (
      <a title={t(intl, 'actions.edit', { type: '' })}
        onClick={aClick}
        href={`${pathname}/${entityId}`}
        rel="noopener noreferrer"
      >
        <Button disabled={disabled}
          loading={isLoading}
          type={type}
          icon={(
            <EditTwoTone />
          )}
          onClick={() => onEdit(entityId)}>
          {showLabel && 'Edit'}
        </Button>
      </a>
  );
};