// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld('api', {
    GET_ALL_PRODUCTS: () => ipcRenderer.invoke("GET_ALL_PRODUCTS"),
    GET_PRODUCT_BY_ID: (id) => ipcRenderer.invoke("GET_PRODUCT_BY_ID", id),
    GET_ALL_FINISHES: () => ipcRenderer.invoke("GET_ALL_FINISHES"),
    GET_ALL_TAGS: () => ipcRenderer.invoke("GET_ALL_TAGS")
});