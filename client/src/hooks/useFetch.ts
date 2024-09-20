/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { Fetch, FetchResponse } from "@/types";
import { useEffect, useState, useCallback } from "react";
import { useAxios } from "./useAxios";

type Props = Fetch & {
  dependencies?: unknown[];
};

export const useFetch = <T>({
  endpoint,
  feature,
  method,
  accessToken,
  includeAccessToken,
  callback,
  data,
  dependencies = [],
}: Props): {
  response: FetchResponse<T> | null;
  isLoading: boolean;
  setResponse: React.Dispatch<React.SetStateAction<FetchResponse<T> | null>>;
  refetch: () => Promise<void>;
} => {
  const [response, setResponse] = useState<FetchResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await useAxios<T>({
        endpoint,
        method,
        feature,
        accessToken,
        includeAccessToken,
        callback,
        data,
      });

      if (callback) {
        callback(res);
      }

      setResponse(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    endpoint,
    method,
    feature,
    accessToken,
    includeAccessToken,
    callback,
    data,
  ]);

  useEffect(() => {
    if (
      (accessToken && includeAccessToken === true) ||
      (!accessToken && includeAccessToken === false)
    ) {
      fetchData();
    } else {
      setIsLoading(false);
     }
  }, [fetchData, accessToken, includeAccessToken, ...dependencies]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return { response, setResponse, isLoading, refetch };
};