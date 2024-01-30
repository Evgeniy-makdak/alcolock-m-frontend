import { StyledTable } from '@shared/styled_components/styledTable';

import { UsersSortTypes } from '../model/effects';

export const getTableHeader = (handleToglleModal: () => void) => {
  return [
    {
      label: 'Пользователь',
      sortType: UsersSortTypes.byName,
    },
    {
      label: 'Почта',
      sortType: UsersSortTypes.byEmail,
    },
    {
      label: 'Роли',
      style: {
        maxWidth: '401px',
        width: '401px',
      },
    },
    {
      label: 'Доступ',
      sortType: UsersSortTypes.byAccess,
    },
    {
      label: 'Дата регистрации',
      sortType: UsersSortTypes.byDate,
      style: {
        maxWidth: '201px',
        width: '201px',
      },
    },
    {
      label: (
        <StyledTable.TableButton onClick={handleToglleModal}>
          <StyledTable.AddIcon />
        </StyledTable.TableButton>
      ),
    },
  ];
};

// {
//   headers.map((head, i) => {
//     return (
//       <StyledTable.HeaderCell key={i} sx={head.style ?? {}}>
//         {head.sortType ? (
//           <TableSortLabel
//             active={orderBy === head.sortType}
//             direction={orderBy === head.sortType ? order : AppConstants.OrderTypes.asc}
//             onClick={() => handleSort(head.sortType)}>
//             {head.label}
//           </TableSortLabel>
//         ) : (
//           head.label
//         )}
//       </StyledTable.HeaderCell>
//     );
//   });
// }

// {
//   !withoutAdd && (
//     <StyledTable.HeaderIconCell>
//       {addItemPromise && (
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             maxWidth: '114px',
//           }}></div>
//       )}
//     </StyledTable.HeaderIconCell>
//   );
// }
