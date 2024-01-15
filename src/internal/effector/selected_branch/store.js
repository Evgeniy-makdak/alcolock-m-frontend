import StateBuilder from '../state_builder';

export const selectedBranchState = new StateBuilder({
  id: 10,
  name: 'Система',
});

export const selectedBranchStore = {
  selectedBranch: selectedBranchState.createHooks(),
};
