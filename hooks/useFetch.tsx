import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const useFetch = <T, Args extends unknown[]>(
  cb: (...args: Args) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef<boolean>(true);

  const fetchData = async (...args: Args): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      if (isMounted.current) {
        setData(response);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err : new Error("An unknown error occurred");
      if (isMounted.current) {
        setError(errorMessage);
        toast.error(errorMessage.message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  // Cleanup to prevent state updates on unmounted component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { data, setData, loading, error, fetchData };
};

export default useFetch;
