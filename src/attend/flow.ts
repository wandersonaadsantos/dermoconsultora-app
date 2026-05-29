export type AttendStep = "triage" | "needs" | "recommendations";

export type AttendState = {
  step: AttendStep;
  hasAlert: boolean;
  selectedNeedTags: string[];
  customNeedText: string;
};

export function createInitialAttendState(): AttendState {
  return {
    step: "triage",
    hasAlert: false,
    selectedNeedTags: [],
    customNeedText: ""
  };
}

export function nextAttendStep(state: AttendState): AttendState {
  if (state.step === "triage") return { ...state, step: "needs" };
  if (state.step === "needs") return { ...state, step: "recommendations" };
  return state;
}

export function previousAttendStep(state: AttendState): AttendState {
  if (state.step === "recommendations") return { ...state, step: "needs" };
  if (state.step === "needs") return { ...state, step: "triage" };
  return state;
}

