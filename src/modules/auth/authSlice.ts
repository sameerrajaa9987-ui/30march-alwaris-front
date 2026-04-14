import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Role = "Admin" | "Operator";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

const STORAGE_KEY = "alwaris.auth";
const storage = window.localStorage;

function loadState(): AuthState {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { accessToken: null, user: null };
    const parsed = JSON.parse(raw) as AuthState;
    return {
      accessToken: parsed.accessToken ?? null,
      user: parsed.user ?? null,
    };
  } catch {
    return { accessToken: null, user: null };
  }
}

function persistState(state: AuthState) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const initialState: AuthState = loadState();

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{ accessToken: string; user: AuthUser }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      persistState(state);
    },
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
      persistState(state);
    },
  },
});

export const { setAuth, clearAuth } = slice.actions;
export default slice.reducer;
