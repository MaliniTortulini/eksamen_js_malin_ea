  export const parseJSON = <T>(json: string | null, defaultValue: T): T => {
    if (json === null) return defaultValue;
    try {
      return JSON.parse(json);
    } catch {
      return defaultValue;
    }
  }
  