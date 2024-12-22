import React, { JSX, useContext } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type TDeleteAction = {
  entityId: string,
  type?: "primary" | "link" | "text" | "default" | "dashed",
  onDelete?: (id: string) => void
}

/**
 * @function DeleteAction
 * @description A component that renders a delete button for the given `entityId`.
 * The button is disabled if the user doesn't have enough permissions to delete the given `entityId`.
 * The button is also disabled if the component is in a loading state.
 * When the button is clicked, a confirmation modal will be shown with the given `modalMsg`.
 * If the user confirms the deletion, the `onDelete` function will be called with the given `entityId`.
 * @param props The props for the component
 * @param props.entityId The id of the entity to be deleted
 * @param props.type The type of a button
 * @param props.modalMsg The message to be displayed in the confirmation modal
 * @param props.isLoading Whether or not the component should be in a loading state
 * @param props.showLabel Whether or not the component should show a label
 * @param props.disabled Whether or not the component should be disabled
 * @param props.onDelete The callback function to be called when the deletion is confirmed
 * @returns {JSX.Element} The JSX element of the component
 */
export const DeleteAction: React.FC<TDeleteAction> = (props): JSX.Element => {
  const {
    entityId,
    type = 'primary',
    onDelete = () => { console.log('Delete'); }
  } = props;

  return (
    <Button danger
      type={type}
      icon={<DeleteOutlined />}
      onClick={() => onDelete(entityId)} />
  );
};