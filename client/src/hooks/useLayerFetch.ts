/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { Fetch } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useAxios } from "./useAxios";

type Props = Fetch & {
  dependencies?: unknown[];
};

export const useLayerFetch = <T>({
  endpoint,
  feature,
  method,
  accessToken,
  callback,
  data,
  dependencies = [],
  includeAccessToken,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
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
      (accessToken === null && includeAccessToken === false)
    ) {
      fetchData();
    }
  }, [fetchData, accessToken, includeAccessToken, ...dependencies]);

  return {
    isLoading,
  };
};
