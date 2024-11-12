export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(c => !!c).join(' ');
}
