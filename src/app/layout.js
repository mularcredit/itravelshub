"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../../public/assets/css/bootstrap-icons.css";
import "../../public/assets/css/all.min.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/fontawesome.min.css";
import "../../public/assets/css/swiper-bundle.min.css";
import "../../public/assets/css/nice-select.css";
import "react-modal-video/css/modal-video.css";
import "../../public/assets/css/slick-theme.css";
import "../../public/assets/css/slick.css";
import "../../public/assets/css/bootstrap-datetimepicker.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../public/assets/css/bootstrap.min.css";
import "yet-another-react-lightbox/styles.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/custom-spacing.css";
import "../../public/assets/css/z-index-fixes.css";
import "../../public/assets/css/custom-scrollbar.css";
import "../../public/assets/css/dropdown-fixes.css";
import "../../public/assets/css/dashboard.css";
import "../../public/assets/css/partners.css";
import "./tailwind.css";
import { useEffect } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}
