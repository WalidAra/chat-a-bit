/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { Fetch } from "@/types";
import { useEffect } from "react";
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
  useEffect(() => {
    const getData = async () => {
      const res = await useAxios<T>({
        endpoint,
        method,
        feature,
        accessToken,
        includeAccessToken,
        data,
      });

      if (callback) {
        callback(res);
      }
    };

    if (
      (accessToken && includeAccessToken === true) ||
      (accessToken === null && includeAccessToken === false)
    ) {
      getData();
    }
  }, [
    accessToken,
    data,
    endpoint,
    feature,
    includeAccessToken,
    method,
    ...(Array.isArray(dependencies) ? dependencies : []),
  ]);
};
