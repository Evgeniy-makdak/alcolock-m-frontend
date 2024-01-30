// import { useRef, useState } from 'react';

// import { useToggle } from '@shared/hooks/useToggle';

export const useTableControlEvents = () => {
  //   const [items, setItems] = useState([]);
  //   const [inputValue, setValue] = useState('');
  //   const [isOpenFilters, toggleIsOpenFilters] = useToggle(false);
  //   const [page, setPage] = useState(0);
  //   const searchQuery = useRef('');
  //   const startDate = useRef('');
  //   const endDate = useRef('');
  //   const timeout = useRef<null | string | NodeJS.Timeout>(null);
  //   const onSearch = (value: string, start: string, end: string) => {
  //     searchQuery.current = value;
  //     startDate.current = start;
  //     endDate.current = end;
  //     if (timeout.current) {
  //       clearTimeout(timeout.current);
  //     }
  //     const newTimeout = setTimeout(() => {
  //       setPage(0);
  //       uploadListPromise({
  //         page: 1,
  //         limit: rowsPerPage,
  //         sortBy: orderBy,
  //         order,
  //         query: value,
  //         startDate: start,
  //         endDate: end,
  //         filtersData: filtersData,
  //       })
  //         .then((res) => {
  //           setItems(res.list);
  //           setItemsCount(res.count);
  //         })
  //         .catch((err) => {
  //           console.log('uploadListPromise error', err);
  //         });
  //       timeout.current = null;
  //     }, 100);
  //     timeout.current = newTimeout;
  //   };
  //   const currentDate = new Date();
  //   const maxDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(
  //     currentDate.getDate(),
  //   ).padStart(2, '0')}`;
  //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     setValue(value);
  //     search(value, startDate, endDate);
  //   };
  //   const onClear = () => {
  //     setValue('');
  //     search('', startDate, endDate);
  //   };
  //   const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     setStartDate(value);
  //     search(inputValue, value, endDate);
  //   };
  //   const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     setEndDate(value);
  //     search(inputValue, startDate, value);
  //   };
  //   return {
  //     maxDate,
  //     isOpenFilters,
  //     toggleIsOpenFilters,
  //     onChange,
  //     onClear,
  //     onChangeStartDate,
  //     onChangeEndDate,
  //     onSearch,
  //     items,
  //     page,
  //   };
};
