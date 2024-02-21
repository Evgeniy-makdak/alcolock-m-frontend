import { useEffect, useState } from 'react';

// TODO => убрать связь со app
import { AppConstants } from '@app';
import { Info } from '@entities/info';
// TODO => убрать связь со страницей
import { TypeOfRows } from '@entities/info/lib/getTypeOfRowIconLabel';
import { getUser } from '@pages/users/model/effects';
import { Loader } from '@shared/ui/loader';
import { Formatters } from '@shared/utils/formatters';

export const UserInfo = ({ selectedUserId, updateData }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUserId) return;
    setLoading(true);
    getUser(selectedUserId)
      .then((res) => {
        if (res) {
          setLoading(false);
          setUserData(res);
        }
      })
      .catch(() => setLoading(false));
  }, [selectedUserId, updateData]);

  const numberPhone = userData?.phone;
  const email = userData?.email;
  const access = userData
    ? AppConstants.accessList.find((access) => access.value === userData.disabled)?.label ?? '-'
    : '-';
  const numberVU = userData?.driver?.licenseCode;
  const name = Formatters.nameFormatter(userData);

  const role = (userData?.groupMembership || []).map((group) => {
    return {
      label: group.group.name,
      color: 'info',
    };
  });
  return (
    <Loader isLoading={loading}>
      <Info
        fields={[
          {
            label: 'Пользователь',
            type: TypeOfRows.USER,
            value: {
              copyble: name === '-' ? false : true,
              label: name,
            },
          },
          {
            label: 'Дата рождения',
            type: TypeOfRows.BIRTHDAY,
            value: { label: Formatters.convertDateFormat(userData?.birthDate) },
          },
          {
            label: 'Номер телефона',
            type: TypeOfRows.PHONE,
            value: { label: numberPhone ?? '-', copyble: numberPhone && true },
          },
          {
            label: 'Почта',
            type: TypeOfRows.EMAIL,
            value: { label: email ?? '-', copyble: email && true },
          },
          {
            label: 'Роли',
            type: TypeOfRows.ROLE,
            value: role.length
              ? role
              : {
                  label: '-',
                },
          },
          {
            label: 'Доступ',
            type: TypeOfRows.ACCESS,

            value: {
              color: userData?.disabled ? 'error' : 'success',
              label: access,
            },
          },
          {
            label: 'Номер ВУ:',
            type: TypeOfRows.NUMBER_VU,
            value: { label: numberVU ?? '-', copyble: numberVU && true },
          },
          {
            label: 'Дата выдачи:',
            type: TypeOfRows.DATE,
            value: { label: Formatters.convertDateFormat(userData?.driver?.licenseIssueDate) },
          },
          {
            label: 'Срок',
            type: TypeOfRows.DATE,
            value: {
              label: Formatters.convertDateFormat(userData?.driver?.licenseExpirationDate),
            },
          },
          {
            label: 'Категории',
            type: TypeOfRows.CATEGORY,
            value: {
              label: (userData?.driver?.licenseClass ?? []).length
                ? userData?.driver.licenseClass.join(', ')
                : '-',
            },
          },
        ]}
      />
    </Loader>
  );
};
