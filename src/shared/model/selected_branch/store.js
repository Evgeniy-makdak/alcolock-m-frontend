import StateBuilder from '@shared/lib/state_builder';

// TODO => Понять для чего это и вынести в соответствующий слой
export const selectedBranchState = new StateBuilder({
  id: 10,
  name: 'Система',
});

export const selectedBranchStore = {
  selectedBranch: selectedBranchState.createHooks(),
};
