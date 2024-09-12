/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { Fetch, FetchResponse } from "@/types";
import { useEffect, useState } from "react";
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
} => {
  const [response, setResponse] = useState<FetchResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
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
        setResponse(res);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      (accessToken && includeAccessToken === true) ||
      (accessToken === null && includeAccessToken === false)
    ) {
      getData();
    } else {
      setIsLoading(false);
    }
  }, [
    accessToken,
    callback,
    data,
    endpoint,
    feature,
    includeAccessToken,
    method,
    ...dependencies,
  ]);

  return { response, setResponse, isLoading };
};