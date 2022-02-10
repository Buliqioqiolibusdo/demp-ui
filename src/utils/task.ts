import {
  TASK_MODE_ALL_NODES,
  TASK_MODE_RANDOM,
  TASK_MODE_SELECTED_NODE_TAGS,
  TASK_MODE_SELECTED_NODES,
  TASK_STATUS_PENDING,
  TASK_STATUS_RUNNING
} from '@/constants/task';
import {translate} from '@/utils/i18n';

const t = translate;

export const getPriorityLabel = (priority: number): string => {
  if (priority <= 2) {
    return `${t('components.task.priority.high')} - ${priority}`;
  } else if (priority <= 4) {
    return `${t('components.task.priority.higher')} - ${priority}`;
  } else if (priority <= 6) {
    return `${t('components.task.priority.medium')} - ${priority}`;
  } else if (priority <= 8) {
    return `${t('components.task.priority.lower')} - ${priority}`;
  } else {
    return `${t('components.task.priority.low')} - ${priority}`;
  }
};

export const isCancellable = (status: TaskStatus): boolean => {
  switch (status) {
    case TASK_STATUS_PENDING:
    case TASK_STATUS_RUNNING:
      return true;
    default:
      return false;
  }
};

export const getModeOptions = (): SelectOption[] => {
  return [
    {value: TASK_MODE_RANDOM, label: t('components.task.mode.label.randomNode')},
    {value: TASK_MODE_ALL_NODES, label: t('components.task.mode.label.allNodes')},
    {value: TASK_MODE_SELECTED_NODES, label: t('components.task.mode.label.selectedNodes')},
    {value: TASK_MODE_SELECTED_NODE_TAGS, label: t('components.task.mode.label.selectedTags')},
  ];
};


export const getModeOptionsDict = (): Map<string, SelectOption> => {
  const modeOptions = getModeOptions();
  const dict = new Map<string, SelectOption>();
  modeOptions.forEach(op => dict.set(op.value, op));
  return dict;
};
