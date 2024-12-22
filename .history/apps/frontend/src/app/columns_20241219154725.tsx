export const metadataColumns = () => {
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
            modalMsg={t(intl, 'environment.title')} />
        </div>
      ),
    }
  ];

  return columns;
}