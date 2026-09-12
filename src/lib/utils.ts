export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(n: number) {
  return n.toString().padStart(2, "0");
}