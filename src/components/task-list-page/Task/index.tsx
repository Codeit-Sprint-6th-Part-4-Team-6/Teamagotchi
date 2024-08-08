import { useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import {
  IconArrowReload,
  IconCalender,
  IconCheckboxActive,
  IconCheckboxDefault,
  IconComment,
  IconKebabSmall,
  IconTime,
} from "@utils/icon";

export default function Task() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckButton = () => {
    setIsChecked((prev) => !prev);
  };

  const descriptionClassName = classNames("text-14 pt-2", {
    "line-through": isChecked,
  });

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className="flex w-full cursor-pointer flex-col gap-10 rounded-8 bg-background-secondary px-14 py-12"
    >
      <div className="flex items-center justify-between gap-8">
        <div className="flex grow justify-between md:justify-start md:gap-12">
          <div className="flex items-center gap-8">
            <button onClick={handleCheckButton}>
              {isChecked ? <IconCheckboxActive /> : <IconCheckboxDefault />}
            </button>
            <span className={descriptionClassName}>등기 비용 안내 드리기</span>
          </div>
          <span className="flex items-center gap-2">
            <IconComment />
            <span className="text-12 text-text-default">3</span>
          </span>
        </div>
        <IconKebabSmall />
      </div>

      <div className="flex items-center gap-10">
        <span className="flex items-center gap-6">
          <IconCalender />
          <time className="text-12 text-text-default">2024년 07월 08일</time>
        </span>
        <span className="h-10 border border-l border-solid border-background-tertiary" />
        <span className="flex items-center gap-6">
          <IconTime />
          <time className="text-12 text-text-default">오후 3:30</time>
        </span>
        <span className="h-10 border border-l border-solid border-background-tertiary" />
        <span className="flex items-center gap-6">
          <IconArrowReload />
          <span className="text-12 text-text-default">매일 반복</span>
        </span>
      </div>
    </motion.div>
  );
}
