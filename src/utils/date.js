// src/utils/date.js
export function formatDateIso(d) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split("T")[0];
}

export function datesOverlap(aStart, aEnd, bStart, bEnd) {
  const Astart = new Date(aStart);
  const Aend = new Date(aEnd);
  const Bstart = new Date(bStart);
  const Bend = new Date(bEnd);

  return Astart < Bend && Bstart < Aend;
}
