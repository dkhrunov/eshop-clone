export const isFormEdited = <E, T>(entity: E, changes: T): boolean => {
  for (const prop in changes) {
    const oldValue = String(entity[prop as unknown as keyof E]).trim();

    const newValue = String(changes[prop as keyof T]).trim();

    if (oldValue !== newValue) {
      return true;
    }
  }

  return false;
};
