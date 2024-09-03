/**
 * Formats the given {@link memberId} to format `YT0004`.
 */
export const formatMemberId = (memberId: number): string => {
  return `YT${memberId.toString().padStart(4, "0")}`;
};
