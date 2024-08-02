import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { IconKebabSmall } from "@utils/icon";

const DropdownContext = createContext({
  isOpen: false,
  toggleDropdown: () => {},
});

export default function Dropdown({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = useMemo(
    () => ({
      isOpen,
      toggleDropdown,
    }),
    [isOpen]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownContext.Provider value={value}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function Toggle({ children }: { children: React.ReactNode }) {
  const { toggleDropdown } = useContext(DropdownContext);

  return (
    <div
      onClick={toggleDropdown}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleDropdown();
        }
      }}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}

function Wrapper({ children, align = "" }: { children: React.ReactNode; align?: string }) {
  const { isOpen } = useContext(DropdownContext);
  const wrapperClassName = classNames(
    `absolute rounded-12 bg-background-secondary py-8 px-16 ${align === "center" ? "text-center" : ""}`
  );

  return isOpen ? <div className={wrapperClassName}>{children}</div> : null;
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-pointer text-nowrap rounded-8 px-8 py-7 text-lg hover:bg-background-tertiary">
      {children}
    </div>
  );
}

function InnerButton({
  children,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-48 w-186 cursor-pointer items-center justify-center gap-5 text-nowrap rounded-8 border border-solid px-8 py-7 text-lg hover:bg-background-tertiary"
    >
      {icon}
      {children}
    </button>
  );
}

function TeamItem({ imgSrc, children }: { imgSrc: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="my-10 flex h-48 w-186 items-center justify-between gap-20 rounded-8 px-8 py-7 hover:bg-background-tertiary"
    >
      <div className="relative h-32 w-32 overflow-hidden rounded-6">
        <Image src={imgSrc} alt={`${children} logo`} fill className="object-cover" />
      </div>
      <span className="text-nowrap text-lg">{children}</span>
      <IconKebabSmall className="mb-4" />
    </button>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
Dropdown.Item = Item;
Dropdown.InnerButton = InnerButton;
Dropdown.TeamItem = TeamItem;
