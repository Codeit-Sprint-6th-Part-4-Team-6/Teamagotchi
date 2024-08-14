import Image from "next/image";
import Label from "@components/commons/Label";
import CircleProgressBar from "./CircleProgressBar";

export default function ReportSection() {
  return (
    <section className="mb-30">
      <div className="mb-20">
        <Label content="리포트" />
      </div>
      <div className="box-border flex h-224 rounded-12 bg-background-secondary p-24">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-30">
            <CircleProgressBar
              className="w-200"
              strokeWidth={30}
              progress={25}
              transitionDuration={1.25}
              isGradientCircle
            />
            <div>
              <p>
                오늘의 <br /> 진행 상황
              </p>
              <h4 className="inline-block bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end bg-clip-text text-4xl font-bold text-text-transparent">
                25%
              </h4>
            </div>
          </div>
          <div className="flex w-full max-w-400 flex-col gap-15">
            <div className="flex justify-between rounded-12 bg-background-tertiary p-16">
              <div className="flex flex-col justify-between">
                <span className="text-xs text-text-secondary">오늘의 할 일</span>
                <span className="text-2xl font-bold leading-none text-brand-tertiary">20개</span>
              </div>
              <div>
                <Image src="/images/todos_person.png" alt="" width="40" height="40" />
              </div>
            </div>
            <div className="flex justify-between rounded-12 bg-background-tertiary p-16">
              <div className="flex flex-col justify-between">
                <span className="text-xs text-text-secondary">한 일</span>
                <span className="text-2xl font-bold leading-none text-brand-tertiary">5개</span>
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
