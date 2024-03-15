import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '@app/index';
import { PageWrapper } from '@layout/page_wrapper';
import { appStore } from '@shared/model/app_store/AppStore';
import { RolesTable } from '@widgets/roles_table';

const Roles = () => {
  const navigate = useNavigate();
  const isAdmin = appStore.getState().isAdmin;
  useEffect(() => {
    if (!isAdmin) {
      navigate(RoutePaths.events);
    }
  }, [isAdmin]);

  return (
    <PageWrapper>
      <RolesTable />
    </PageWrapper>
  );
};

export default Roles;
