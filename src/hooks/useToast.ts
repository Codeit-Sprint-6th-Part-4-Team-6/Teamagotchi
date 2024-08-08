import { useToastStore } from "@store/useToastStore";

export const useToast = () => {
  const { setToast, setIsOpen } = useToastStore();

  const toast = (type: "info" | "success" | "warn" | "danger", content: string) => {
    const data = { type, content };
    setToast(data);
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return { toast };
};
