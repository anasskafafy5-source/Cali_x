import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../services/apiTransactions";
import { toast } from "react-hot-toast";

export function useAddNewTransaction() {
  const queryClient = useQueryClient();
  const { mutate: addNewTransactionMutation, isPending } = useMutation({
    mutationFn: (newTransaction) => createTransaction(newTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("تمت إضافة العملية بنجاح");
    },
    onError: (error) => {
      console.error(error);
      toast.error("حدث خطأ أثناء إضافة العملية");
    },
  });
  return { addNewTransactionMutation, isPending };
}
