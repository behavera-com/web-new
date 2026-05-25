"use client";

type FieldTooltipProps = {
  id: string;
  text: string;
};

/**
 * Pure-CSS hover tooltip. No focus, no click — only :hover.
 *
 * - Desktop: hover the `?` icon → popup appears, leaves with mouse
 * - Mobile (no hover): native `title` attribute is the fallback
 *   (long-press shows it in most browsers)
 * - Screen readers: the input itself has `aria-describedby={id}` and reads
 *   this tooltip's content as the field's description — no need for the
 *   `?` icon to be focusable
 */
export default function FieldTooltip({ id, text }: FieldTooltipProps) {
  return (
    <span className="sj-tip" title={text} aria-hidden="true">
      <span className="sj-tip-icon">?</span>
      <span role="tooltip" id={id} className="sj-tip-pop">
        {text}
      </span>
    </span>
  );
}
