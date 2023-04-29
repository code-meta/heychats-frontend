import { topNavLinks } from "#/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PrimaryTopNav = () => {
  const router = useRouter();
  return (
    <nav>
      <ul className="flex list-none gap-10">
        {topNavLinks.map(({ Icon, link, text }) => (
          <li key={link}>
            <Link
              href={link}
              className="flex gap-2 text-base-content link-hover items-center select-none"
            >
              <Icon
                className={`${
                  router.pathname === link && "text-secondary"
                } transition-all duration-500`}
              />
              <span
                className={`${
                  router.pathname === link && "text-primary"
                } capitalize font-open-sans text-lg font-medium transition-all duration-500`}
              >
                {text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PrimaryTopNav;
