import type { Metadata } from "next";
import UIKitClient from "./UIKitClient";

export const metadata: Metadata = {
  title: "UI Kit — Behavera",
  robots: { index: false, follow: false },
};

export default function UIKitPage() {
  return <UIKitClient />;
}
