// Storage is optional: privacy settings, quotas and malformed values must not
// interrupt a game. Pass a getter because accessing localStorage can itself throw.
export function readRecord(
  getStorage: () => Pick<Storage, 'getItem'>,
  key: string,
  maximum: number,
): number {
  try {
    const value = Number(getStorage().getItem(key));
    return Number.isInteger(value) && value >= 0 && value <= maximum
      ? value
      : 0;
  } catch {
    return 0;
  }
}

export function writeRecord(
  getStorage: () => Pick<Storage, 'setItem'>,
  key: string,
  value: number,
): void {
  try {
    getStorage().setItem(key, String(value));
  } catch {
    // The current session still displays the record when persistence is unavailable.
  }
}
