import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { IconKebabSmall } from "@utils/icon";

const PopoverContext = createContext({
  isOpen: false,
  togglePopover: () => {},
});

export default function Popover({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = useMemo(
    () => ({
      isOpen,
      togglePopover,
    }),
    [isOpen]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closePopover();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <PopoverContext.Provider value={value}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

function Toggle({ children }: { children: React.ReactNode }) {
  const { togglePopover } = useContext(PopoverContext);

  return (
    <button
      type="button"
      onClick={togglePopover}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          togglePopover();
        }
      }}
      tabIndex={0}
      className="cursor-pointer"
    >
      {children}
    </button>
  );
}

function Wrapper({
  children,
  popDirection = "right",
}: {
  children: React.ReactNode;
  popDirection?: "left" | "right";
}) {
  const { isOpen } = useContext(PopoverContext);

  const wrapperClassName = classNames(
    `${popDirection === "left" ? "right-0" : ""} absolute top-30 rounded-12 border border-solid border-background-tertiary bg-background-secondary px-16 py-8 text-center box-border max-w-218 min-w-120 md:min-w-135`
  );

  return isOpen ? <div className={wrapperClassName}>{children}</div> : null;
}

function Item({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer text-nowrap rounded-8 py-7 text-md transition-all hover:bg-background-tertiary md:text-lg"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
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
      className="mb-10 flex h-48 w-186 cursor-pointer items-center justify-center gap-5 text-nowrap rounded-12 border border-solid px-8 py-7 text-lg hover:bg-background-tertiary"
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
      className="my-10 flex h-48 w-186 items-center gap-20 rounded-8 px-8 py-7 hover:bg-background-tertiary"
    >
      <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-6">
        <Image src={imgSrc} alt={`${children} logo`} fill className="object-cover" />
      </div>
      <span className="flex-grow text-left text-lg">{children}</span>
      <IconKebabSmall className="mb-4 flex-shrink-0" />
    </button>
  );
}

Popover.Toggle = Toggle;
Popover.Wrapper = Wrapper;
Popover.Item = Item;
Popover.InnerButton = InnerButton;
Popover.TeamItem = TeamItem;
