import { useMutation } from "@tanstack/react-query";
import { addSession } from "../../services/apiSessions";
import toast from "react-hot-toast";

export function useAddSession() {
  const { mutate: addSessionMutation, isPending } = useMutation({
    mutationFn: (newSession) => addSession(newSession),
    onSuccess: () => {
      toast.success("تم اضافه الحصه بي نجاح");
    },
    onError: () => toast.error("هناك خطا حاول مجددا "),
  });
  return { addSessionMutation, isPending };
}
