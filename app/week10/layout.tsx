// app/week10/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Week 10 - Shopping List with Firestore",
  description: "Shopping list application with Cloud Firestore integration",
};

export default function Week10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
