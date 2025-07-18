import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";

const useOnboarding = () => {
  const queryClient = useQueryClient();
  
  const { 
    mutate: onboardingMutation, 
    isPending, 
    error 
  } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { isPending, error, onboardingMutation };
};

export default useOnboarding;