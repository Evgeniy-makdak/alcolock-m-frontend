import Formatters from "../../../internal/utils/formatters";

export const userMapper = (user) => {
  if (!user) return {}

  return {
    ...user,
    userGroups: (user.groupMembership ?? []).map(item => item.group.id),
    licenseCode: user.driver?.licenseCode,
    licenseIssueDate: user.driver?.licenseIssueDate,
    licenseClass: user.driver?.licenseClass,
    licenseExpirationDate: user.driver?.licenseExpirationDate,
    name: Formatters.nameFormatter(user)
  }
}
