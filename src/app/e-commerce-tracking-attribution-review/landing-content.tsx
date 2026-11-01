"use client";

import { useEffect, useState } from "react";
import { BookingModal } from "@/components/booking-modal";

type Props = {
  bodyHtml: string;
  scriptCode: string;
};

export default function LandingContent({ bodyHtml, scriptCode }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState<string>("");

  useEffect(() => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(scriptCode);
      fn();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Landing page script error:", e);
    }
  }, [scriptCode]);

  // Listen for clicks on booking modal trigger buttons
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest(".booking-modal-trigger");
      if (trigger) {
        e.preventDefault();
        const pkg = trigger.getAttribute("data-package") || "";
        setBookingPackage(pkg);
        setBookingOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultPackage={bookingPackage}
      />
    </>
  );
}
