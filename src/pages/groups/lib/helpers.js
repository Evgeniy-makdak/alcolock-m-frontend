import Formatters from '@shared/utils/formatters';

export const getRowsTemplate = (item) => {
  return {
    id: item.id,
    disabledAction: item.systemGenerated,
    values: [
      {
        value: item.name,
      },
      {
        value: Formatters.nameFormatter(item.createdBy),
      },
      {
        value: Formatters.formatISODate(item.createdAt),
        style: {
          maxWidth: '201px',
          width: '201px',
        },
      },
    ],
  };
};

export const getDeletePopupBody = (selectedItem) => {
  return (
    <p>
      Вы действительно хотите удалить группу <b>{selectedItem?.name}</b>?
    </p>
  );
};
