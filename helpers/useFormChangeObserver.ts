import { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";

/**
 * Hook to track form changes and prevent navigation when there are unsaved changes.
 * @param watch - `useForm`'s watch function from react-hook-form
 * @param initialValues - Initial form values for comparison
 * @returns `{ isFormDirty }`
 */
export function useFormChangeObserver<
  T extends {
    name: string;
    type: "CURRENT" | "SAVINGS";
    balance: string;
    isDefault: boolean;
  }
>(watch: UseFormWatch<T>, initialValues: T) {
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    const subscription = watch((values) => {
      const hasChanges =
        JSON.stringify(values) !== JSON.stringify(initialValues);
      setIsFormDirty(hasChanges);
    });
    return () => subscription.unsubscribe();
  }, [watch, initialValues]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    const handleBackButton = () => {
      if (
        isFormDirty &&
        !confirm("You have unsaved changes. Are you sure you want to leave?")
      ) {
        window.history.pushState(null, "", window.location.href);
      }
    };

    if (isFormDirty) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isFormDirty]);

  return { isFormDirty };
}
