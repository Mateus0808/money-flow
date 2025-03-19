import { errorNotify, successNotify } from "@/libs/notify/notify";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

interface UseGenericMutationProps<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey?: string;
  successMessage?: string;
}

export function useGenericMutation<TData, TVariables>({
  mutationFn,
  queryKey,
  successMessage,
}: UseGenericMutationProps<TData, TVariables>): UseMutationResult<TData, unknown, TVariables> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
      if (successMessage) {
        successNotify(successMessage);
      }
    },
    onError: (error: any) => {
      errorNotify(error.message);
    },
  });
}
