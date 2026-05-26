"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      const active = document.activeElement;
      triggerRef.current =
        active && active !== document.body ? (active as HTMLElement) : null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      const trigger = triggerRef.current;
      triggerRef.current = null;
      if (trigger?.isConnected) {
        requestAnimationFrame(() => trigger.focus());
      }
    }
  }, [open]);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onCloseRef.current();
    };
    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) onCloseRef.current();
    };
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      aria-modal="true"
      className="sj-modal"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Zavřít"
        className="sj-modal-close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className="sj-modal-body">{children}</div>
    </dialog>
  );
}
