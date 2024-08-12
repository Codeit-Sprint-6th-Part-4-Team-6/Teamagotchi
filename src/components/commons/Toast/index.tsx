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
    <>
      {isOpen && (
        <div className="fixed bottom-60 left-1/2 z-10 -translate-x-1/2 animate-fadeIn">
          <div className="flex h-80 items-center rounded-lg bg-text-primary light:bg-background-primary">
            <span className={`h-full w-5 rounded-l-lg ${pointColor}`} />
            <div className="px-20">
              {toast?.type === "info" ? <IconToastInfo /> : ""}
              {toast?.type === "success" ? <IconToastSuccess /> : ""}
              {toast?.type === "warn" ? <IconToastWarning /> : ""}
              {toast?.type === "danger" ? <IconToastDanger /> : ""}
            </div>
            <p className="text-black pr-25 font-medium light:text-text-primary">{toast?.content}</p>
          </div>
        </div>
      )}
    </>
  );
}
