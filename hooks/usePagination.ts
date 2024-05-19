// hooks/useTablePagination.ts
import { useState } from 'react';

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const useTablePagination = (initialPagination: Pagination) => {
  const [pagination, setPagination] = useState(initialPagination);

  const handleTableChange = (newPagination: Pagination) => {
    setPagination(newPagination);
  };

  return { pagination, handleTableChange };
};

export default useTablePagination;