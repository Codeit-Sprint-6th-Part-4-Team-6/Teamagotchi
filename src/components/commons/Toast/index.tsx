import { useToastStore } from "@store/useToastStore";
import { IconToastDanger, IconToastInfo, IconToastSuccess, IconToastWarning } from "@utils/icon";

export default function Toast() {
  const { toast, isOpen } = useToastStore();

  let pointColor = "";

  switch (toast?.type) {
    case "info":
      pointColor = "bg-point-blue";
      break;
    case "success":
      pointColor = "bg-point-green";
      break;
    case "warn":
      pointColor = "bg-point-yellow";
      break;
    default:
      pointColor = "bg-point-red";
      break;
  }

  return (
    <div
      className={
        isOpen
          ? `fixed right-1/2 top-30 translate-x-1/2 md:right-20 md:translate-x-0`
          : `-translate-y-full delay-500 md:-translate-x-full`
      }
    >
      <div className="light:bg-background-primary flex h-80 items-center rounded-lg bg-text-primary">
        <span className={`h-full w-5 rounded-l-lg ${pointColor}`} />
        <div className="px-20">
          {toast?.type === "info" ? <IconToastInfo /> : ""}
          {toast?.type === "success" ? <IconToastSuccess /> : ""}
          {toast?.type === "warn" ? <IconToastWarning /> : ""}
          {toast?.type === "danger" ? <IconToastDanger /> : ""}
        </div>
        <p className="text-black light:text-text-primary pr-25 font-medium">{toast?.content}</p>
      </div>
    </div>
  );
}
