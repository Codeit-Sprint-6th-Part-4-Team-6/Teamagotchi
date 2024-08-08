import { useToastStore } from "@store/useToastStore";

const useToast = () => {
  const { setToast, setIsOpen } = useToastStore();

  const toast = (type: "info" | "success" | "warn" | "danger", content: string) => {
    const data = { type, content };
    setToast(data);

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    });
  };

  return { toast };
};
