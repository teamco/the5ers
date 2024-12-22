export const metadataColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void) => {
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
      render: (record) => (
        <div className="eActions">
          <EditAction
            onEdit={onEdit}
            type={'text'}
            entityId={record._id} />
          <DeleteAction
            onDelete={onDelete}
            type={'text'}
            entityId={record._id}
            modalMsg={'Delete stock'} />
        </div>
      ),
    }
  ];

  return columns;
}