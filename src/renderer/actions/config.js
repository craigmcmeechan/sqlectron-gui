import cloneDeep from 'lodash.clonedeep';
var { config, sqlectron }=window.myremote;
export const LOAD_CONFIG_REQUEST = 'LOAD_CONFIG_REQUEST';
export const LOAD_CONFIG_SUCCESS = 'LOAD_CONFIG_SUCCESS';
export const LOAD_CONFIG_FAILURE = 'LOAD_CONFIG_FAILURE';
export const SAVE_CONFIG_REQUEST = 'SAVE_CONFIG_REQUEST';
export const SAVE_CONFIG_SUCCESS = 'SAVE_CONFIG_SUCCESS';
export const SAVE_CONFIG_FAILURE = 'SAVE_CONFIG_FAILURE';
export const START_EDITING_CONFIG = 'START_EDITING_CONFIG';
export const FINISH_EDITING_CONFIG = 'FINISH_EDITING_CONFIG';

export function loadConfig() {
  return async dispatch => {
    dispatch({ type: LOAD_CONFIG_REQUEST });
    try {
      //console.log("loadConfig");
      const forceCleanCache = true;
      const configPath = await sqlectron.config.path();
      //console.log(configPath);
      const remoteConfig = await config.get(forceCleanCache);
      //console.log(remoteConfig);

      // Remove any "reference" to the remote IPC object
      const configData = cloneDeep(remoteConfig);

      dispatch({ type: LOAD_CONFIG_SUCCESS, config: configData, path: configPath });
    } catch (error) {
      // console.log(error);
      dispatch({ type: LOAD_CONFIG_FAILURE, error });
    }
  };
}


export function saveConfig(configData) {
  // console.log("saveConfig");
  return async dispatch => {
    dispatch({ type: SAVE_CONFIG_REQUEST });
    try {
      // console.log(configData);
      await sqlectron.config.saveSettings(configData);
      dispatch({ type: SAVE_CONFIG_SUCCESS, config: configData });
    } catch (error) {
      dispatch({ type: SAVE_CONFIG_FAILURE, error });
    }
  };
}


export function startEditing(id) {
  return { type: START_EDITING_CONFIG, id };
}


export function finishEditing() {
  return { type: FINISH_EDITING_CONFIG };
}
