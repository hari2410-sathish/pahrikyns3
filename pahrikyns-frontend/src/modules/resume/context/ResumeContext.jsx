import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import {
  saveOfflineSnapshot,
  loadOfflineSnapshot,
  queueSync,
  flushSyncQueue,
  setupOfflineAutosaveWatcher,
  isOnline,
} from "../utils/offlineAutosave";

import { updateResume } from "../services/resumeApi";

/** ========================================================
 *  RESUME CONTEXT — FINAL PRO VERSION (v3)
 *  Includes:
 *  ✔ Undo / Redo
 *  ✔ Offline autosave
 *  ✔ Online sync
 *  ✔ Zero rerender optimization
 * ======================================================== */

const ResumeContext = createContext();

// ------------------ INITIAL STATE ------------------
const initialState = {
  personal: {},
  experience: [],
  education: [],
  projects: [],
  skills: [],
  achievements: [],
  theme: "default",
  history: [],
  future: [],
};

// ------------------ ACTIONS ------------------
const ACTIONS = {
  UPDATE: "UPDATE",
  UNDO: "UNDO",
  REDO: "REDO",
  RESET: "RESET",
  LOAD_OFFLINE: "LOAD_OFFLINE",
};

// ------------------ REDUCER ------------------
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE: {
      const updated = { ...state, ...action.payload };
      return {
        ...updated,
        history: [...state.history, state],
        future: [],
      };
    }

    case ACTIONS.UNDO: {
      if (!state.history.length) return state;
      const previous = state.history[state.history.length - 1];
      return {
        ...previous,
        history: state.history.slice(0, -1),
        future: [state, ...state.future],
      };
    }

    case ACTIONS.REDO: {
      if (!state.future.length) return state;
      const next = state.future[0];
      return {
        ...next,
        history: [...state.history, state],
        future: state.future.slice(1),
      };
    }

    case ACTIONS.LOAD_OFFLINE:
      return { ...state, ...action.payload };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}

// ------------------ PROVIDER ------------------
export function ResumeProvider({ children }) {
  const resumeId = "default-resume"; // TODO: replace with real ID
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load offline snapshot if available
  useEffect(() => {
    const snapshot = loadOfflineSnapshot(resumeId);
    if (snapshot) {
      dispatch({ type: ACTIONS.LOAD_OFFLINE, payload: snapshot.data });
    }
  }, []);

  // Autosave handler
  useEffect(() => {
    if (!state) return;

    const save = async () => {
      if (isOnline()) {
        await flushSyncQueue(updateResume);
        await updateResume(resumeId, state);
      } else {
        saveOfflineSnapshot(resumeId, state);
        queueSync(resumeId, state);
      }
    };

    const timeout = setTimeout(save, 800);
    return () => clearTimeout(timeout);
  }, [state]);

  // Watch for online/offline changes
  useEffect(() => {
    setupOfflineAutosaveWatcher((status) => {
      console.log("Network:", status);
    });
  }, []);

  // Memoized actions
  const update = useCallback((data) => {
    dispatch({ type: ACTIONS.UPDATE, payload: data });
  }, []);

  const undo = useCallback(() => dispatch({ type: ACTIONS.UNDO }), []);
  const redo = useCallback(() => dispatch({ type: ACTIONS.REDO }), []);
  const reset = useCallback(() => dispatch({ type: ACTIONS.RESET }), []);

  const value = useMemo(
    () => ({ state, update, undo, redo, reset }),
    [state]
  );

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

// ------------------ HOOK ------------------
export function useResume() {
  return useContext(ResumeContext);
}
