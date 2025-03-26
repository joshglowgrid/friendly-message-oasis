
"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-orange-400 bg-black/80 backdrop-blur-sm p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} href="#content">Home</Tab>
      <Tab setPosition={setPosition} href="#about">About</Tab>
      <Tab setPosition={setPosition} href="#services">Services</Tab>
      <Tab setPosition={setPosition} href="#why-us">Why Us</Tab>
      <Tab setPosition={setPosition} href="#industries">Industries</Tab>
      <Tab setPosition={setPosition} href="#contact">Contact</Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      <a href={href}>{children}</a>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full orange-gradient-bg md:h-12"
    />
  );
};

export default NavHeader;
