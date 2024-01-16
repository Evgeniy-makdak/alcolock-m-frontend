import { useEffect, useState } from 'react';

import { uploadRolesList } from '@pages/roles/model/effects';
import ValidationsWrapper from '@shared/components/validations_wrapper/ValidationsWrapper';

import './RolesSelect.sass';

const RolesSelect = ({ formSelectors, fieldParams, isEdit = false }) => {
  const [allRoles, setAllRoles] = useState([]);

  const value = formSelectors.useFormDataValue(fieldParams.name) ?? [];
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);
  const validations = formSelectors.useFormValueValidation(fieldParams.name);
  const validateAllFields = formSelectors.useValidateAllFields();
  const isValidationsAvailable = formSelectors.useIsValidationsAvailable();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    uploadRolesList({
      page: 1,
      limit: 1000,
    })
      .then((res) => {
        setAllRoles(res.list);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('RolesSelect uploadRolesList error', err.response ?? err);
      });
  }, []);

  const onClickRole = (id) => {
    let currentRoles = [...value];

    if (
      (currentRoles.includes(100) && id !== 100) ||
      (currentRoles.length && id === 100 && !currentRoles.includes(100)) ||
      (isEdit && id === 100)
    )
      return;

    if (currentRoles.includes(id)) {
      currentRoles = currentRoles.filter((roleId) => roleId !== id);
    } else {
      currentRoles.push(id);
    }

    setValue(currentRoles.length ? currentRoles : null);

    if (isValidationsAvailable) {
      validateAllFields();
    }
  };

  return (
    <div className={'roles-select'}>
      <span
        style={{
          color: !!validations.length ? 'red' : 'rgba(0, 0, 0, 0.6)',
        }}>
        {fieldParams.label}
      </span>

      <ValidationsWrapper validationMsgs={validations}>
        <div className="roles-select__wrapper">
          {loading && <span style={{ fontSize: 14 }}>Загрузка...</span>}
          {allRoles.map((role) => {
            const isDisabled =
              (value.includes(100) && role.id !== 100) ||
              (role.id === 100 && value.length && !value.includes(100)) ||
              (isEdit && !value.includes(100) && role.id === 100);
            const disabledClass = isDisabled ? 'disabled' : '';
            return (
              <span
                key={role.id}
                className={`roles-select__role ${value.includes(role.id) ? 'active' : ''} ${disabledClass}`}
                onClick={() => onClickRole(role.id)}>
                {role.name}
              </span>
            );
          })}
        </div>
      </ValidationsWrapper>
    </div>
  );
};

export default RolesSelect;
