type Collection = "usersData" | "transactions";

export const getDataFromLocalStorage = <T>(
  key: Collection,
  defaultValue: T
): T => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      return JSON.parse(storedData) as T;
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  }
  return defaultValue;
};
