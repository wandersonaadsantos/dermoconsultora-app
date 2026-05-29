export type AttendArea = "Rosto" | "Corpo" | "Cabelo" | "Perfumaria" | "Maquiagem";

export type AttendPreference = "uso-simples" | "mais-suave" | "sem-preferencia";

export type AttendNeedKind = "tag" | "query";

export type AttendAnswers = {
  need: string;
  needKind: AttendNeedKind;
  area: AttendArea;
  preference: AttendPreference;
  hasAlert: boolean;
};

export type AttendResult =
  | {
      mode: "alert";
      safePhrase: string;
      reason: string;
      items: [];
    }
  | {
      mode: "recommendations";
      safePhrase: string;
      reason: string;
      items: unknown[];
    };

