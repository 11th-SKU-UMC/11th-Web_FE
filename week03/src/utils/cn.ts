export type ClassValue = string | false | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]) {
  return inputs.flat(Infinity).filter(Boolean).join(" ");
}
