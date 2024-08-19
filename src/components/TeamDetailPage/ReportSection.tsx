import Image from "next/image";
import Label from "@components/commons/Label";
import CircleProgressBar from "./CircleProgressBar";

export default function ReportSection({
  completionRate,
  totalTasks,
  completedTasks,
}: {
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
}) {
  return (
    <section className="mb-30">
      <div className="mb-20">
        <Label content="리포트" />
      </div>
      <div className="box-border flex h-224 rounded-12 bg-background-secondary p-24">
        <div className="flex w-full items-center justify-between">
          <div className="relative flex items-center justify-center gap-30">
            <CircleProgressBar
              className="w-120 md:w-200"
              strokeWidth={30}
              progress={completionRate}
              transitionDuration={1.25}
              isGradientCircle
            />
            <div className="absolute block text-center md:static md:pr-20 md:text-left">
              <p className="text-md text-text-primary">
                <span className="text-xs md:text-md">오늘</span>
                <span className="hidden md:inline">
                  의 <br /> 진행 상황
                </span>
              </p>
              <h4 className="inline-block bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end bg-clip-text text-xl font-bold text-text-transparent md:text-4xl">
                {Math.round(completionRate)}%
              </h4>
            </div>
          </div>
          <div className="flex w-142 min-w-120 flex-col gap-15 md:w-280 lg:w-400">
            <div className="flex justify-between rounded-12 bg-background-tertiary p-16">
              <div className="flex flex-col justify-between">
                <span className="text-xs text-text-secondary">오늘의 할 일</span>
                <span className="text-2xl font-bold leading-none text-brand-tertiary">
                  {totalTasks}개
                </span>
              </div>
              <div>
                <Image src="/images/todos_person.png" alt="" width="40" height="40" />
              </div>
            </div>
            <div className="flex justify-between rounded-12 bg-background-tertiary p-16">
              <div className="flex flex-col justify-between">
                <span className="text-xs text-text-secondary">한 일</span>
                <span className="text-2xl font-bold leading-none text-brand-tertiary">
                  {completedTasks}개
                </span>
              </div>
              <div>
                <Image src="/images/todos_done.png" alt="" width="40" height="40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
