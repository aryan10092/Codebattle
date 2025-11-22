

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import React, { useEffect, useState } from "react";

const NAV_ITEMS = ["Home", "New arrivals", "Download", "Pricing"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
   
      <header className={`py-4 border-b border-white/15 md:border-none sticky top-0 z-50 backdrop-blur flex justify-center items-center`}> 
        <div className="container w-full">
          <div className={`flex justify-between items-center md:border border-white/15 p-2.5 rounded-xl max-w-2xl mx-auto px-10`}> 
            {/* left: logo container */}
            <div className="border border-white/15 flex justify-center items-center h-10 w-10 rounded-md">
              {/* replace src with your logo file */}
              {/* <img alt="Logo" loading="lazy" width={32} height={32} decoding="async" className="bg-gray-50" src="/logo.svg" /> */}
              <div className="text-whit font-bold text-lg">
                <img src="/logo1.png" alt="CodeBattle Logo" className="h-6 w-auto"/>
              </div>
            </div>

            {/* center: (optional) could be nav links - keeping empty to match screenshot spacing */}
            <div />

            {/* right: CTA button */}
            <div className="">
              <a href="/login">
                <button className="relative text-white py-2 px-3 font-semibold border border-[#605e5e] tracking-wide text-sm rounded-lg hover:bg-white/10 transition">
                  Sign in
                </button>
                
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }