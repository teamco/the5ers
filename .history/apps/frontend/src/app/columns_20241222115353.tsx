import { DeleteAction } from "./delete.action";
import { EditAction } from "./edit.action";

type TRecord = {
  _id: string
}

type TColumns = {
  title: string,
  dataIndex: string,
  key: string,
  align?: string,
  width?: number,
  render?: (record: TRecord) => JSX.Element
}

/**
 * Generates an array of column configurations for a data table.
 * Each column configuration includes properties like title, dataIndex, key, 
 * and an optional render function for custom rendering of the column.
 * 
 * The columns include:
 * - Name: Displays the stock name.
 * - Symbol: Displays the stock symbol.
 * - Price: Displays the stock price.
 * - Actions: Provides edit and delete actions for each stock record.
 * 
 * @param onEdit - A callback function that is triggered when the edit action is performed.
 * @param onDelete - A callback function that is triggered when the delete action is performed.
 * @returns An array of column configurations for use in a data table.
 */

export const metadataColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void): TColumns[] => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (record: TRecord) => (
        <div className="eActions">
          <EditAction
            onEdit={onEdit}
            type={'text'}
            entityId={record?._id} />
          <DeleteAction
            onDelete={onDelete}
            type={'text'}
            entityId={record?._id} />
        </div>
      ),
    }
  ];

  return columns.map((column) => ({ ...column, dataIndex: column.key }));
}