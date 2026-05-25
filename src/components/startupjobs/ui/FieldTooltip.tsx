"use client";

type FieldTooltipProps = {
  id: string;
  text: string;
};

/**
 * Pure-CSS hover/focus tooltip. No JS state, no click handling.
 *
 * - Desktop: hover the `?` icon or focus it (Tab) → popup appears
 * - Mobile (no hover): native `title` attribute is the fallback;
 *   long-press shows it in most browsers
 * - The full text is always available to screen readers via aria-label
 *   on the wrapper + matching id for `aria-describedby` from the input
 */
export default function FieldTooltip({ id, text }: FieldTooltipProps) {
  return (
    <span
      className="sj-tip"
      tabIndex={0}
      role="button"
      aria-label={text}
      aria-describedby={id}
      title={text}
    >
      <span aria-hidden="true" className="sj-tip-icon">
        ?
      </span>
      <span role="tooltip" id={id} className="sj-tip-pop">
        {text}
      </span>
    </span>
  );
}
