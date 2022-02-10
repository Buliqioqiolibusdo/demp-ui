type SpiderStoreModule = BaseModule<SpiderStoreState, SpiderStoreGetters, SpiderStoreMutations, SpiderStoreActions>;

interface SpiderStoreState extends BaseStoreState<Spider> {
  fileNavItems: FileNavItem[];
  activeNavItem?: FileNavItem;
  fileContent: string;
  defaultFilePaths: string[];
  currentGitBranch: string;
  gitData: GitData;
  gitChangeSelection: TableData<GitChange>;
  gitRemoteRefs: GitRef[];
  gitRefType: string;
}

interface SpiderStoreGetters extends BaseStoreGetters<SpiderStoreState> {
  gitLogsMap: StoreGetter<SpiderStoreState, Map<string, GitLog>>;
}

interface SpiderStoreMutations extends BaseStoreMutations<Spider> {
  setFileNavItems: StoreMutation<BaseStoreState<Spider>, FileNavItem[]>;
  setActiveFileNavItem: StoreMutation<BaseStoreState<Spider>, FileNavItem>;
  resetActiveFileNavItem: StoreMutation<BaseStoreState<Spider>>;
  setFileContent: StoreMutation<BaseStoreState<Spider>, string>;
  resetFileContent: StoreMutation<BaseStoreState<Spider>>;
  setDefaultFilePaths: StoreMutation<BaseStoreState<Spider>, string[]>;
  resetDefaultFilePaths: StoreMutation<BaseStoreState<Spider>>;
  setCurrentGitBranch: StoreMutation<BaseStoreState<Spider>, string>;
  resetCurrentGitBranch: StoreMutation<BaseStoreState<Spider>>;
  setGitData: StoreMutation<BaseStoreState<Spider>, GitData>;
  resetGitData: StoreMutation<BaseStoreState<Spider>>;
  setGitChangeSelection: StoreMutation<BaseStoreState<Spider>, GitChange[]>;
  resetGitChangeSelection: StoreMutation<BaseStoreState<Spider>>;
  setGitRemoteRefs: StoreMutation<BaseStoreState<Spider>, GitRef[]>;
  resetGitRemoteRefs: StoreMutation<BaseStoreState<Spider>>;
  setGitRefType: StoreMutation<BaseStoreState<Spider>, string>;
  resetGitRefType: StoreMutation<BaseStoreState<Spider>>;
}

interface SpiderStoreActions extends BaseStoreActions<Spider> {
  runById: StoreAction<BaseStoreState, { id: string; options: SpiderRunOptions }>;
  listDir: StoreAction<BaseStoreState, FileRequestPayload>;
  getFile: StoreAction<BaseStoreState, FileRequestPayload>;
  getFileInfo: StoreAction<BaseStoreState, FileRequestPayload>;
  saveFile: StoreAction<BaseStoreState, FileRequestPayload>;
  saveFileBinary: StoreAction<BaseStoreState, FileRequestPayload>;
  saveDir: StoreAction<BaseStoreState, FileRequestPayload>;
  renameFile: StoreAction<BaseStoreState, FileRequestPayload>;
  deleteFile: StoreAction<BaseStoreState, FileRequestPayload>;
  copyFile: StoreAction<BaseStoreState, FileRequestPayload>;
  getGit: StoreAction<BaseStoreState, { id: string }>;
  getGitRemoteRefs: StoreAction<BaseStoreState, { id: string }>;
  gitPull: StoreAction<BaseStoreState, { id: string; branch: string }>;
  gitCommit: StoreAction<BaseStoreState, { id: string; commit_message: string }>;
}
