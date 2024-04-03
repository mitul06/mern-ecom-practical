import toast from "react-hot-toast";

type TStatus = "success" | "error";

const useToggle = () => {
  const showToast = (status: TStatus, message: string) => {
    if (status === "success") {
      toast.success(message || "Operation successful!", { duration: 1000, position: 'top-right' });
    } else if (status === "error") {
      toast.error(message || "Something went wrong!", { duration: 1000, position: 'top-right' });
    }
  };

  return showToast;
};

export default useToggle;
