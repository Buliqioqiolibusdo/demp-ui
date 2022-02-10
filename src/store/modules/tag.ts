import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';
import colors from '@/styles/color.scss';

const state = {
  ...getDefaultStoreState<Tag>('tag'),
  newFormFn: () => {
    const colorNames = Object.keys(colors);
    const index = Math.floor(Math.random() * colorNames.length);
    const name = colorNames[index];
    const color = colors[name] || colors.blue;
    return {
      color,
    };
  },
} as TagStoreState;

const getters = {
  ...getDefaultStoreGetters<Tag>(),
} as TagStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<Tag>(),
} as TagStoreMutations;

const actions = {
  ...getDefaultStoreActions<Tag>('/tags'),
} as TagStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as TagStoreModule;
