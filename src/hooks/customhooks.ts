import { useContext } from "react";
import { GlobalUseContext } from "../context/context";
import useAxiosPrivate from "./useAxiosHook";
import { AxiosError } from "axios";
import useSWR from "swr";
import type { errorResponse, globalHTTPReqFuncAttributes, isNotificationPopAttributes } from "../utilities/typedec";

export const useHttpFetcher = () => {
  const { state, dispatch } = useContext(GlobalUseContext);
  const { notify } = useNotificationHook();
  const axiosPrivate = useAxiosPrivate();

  const fetchIt = async (params: globalHTTPReqFuncAttributes) => {
    const {
      apiEndPoint,
      httpMethod,
      reqData,
      isSuccessNotification,
      timerDuration,
      contypeType,
      responseType,
    } = params;

    dispatch({type: 'ISLOADING_START'})
    try {
      const res = await axiosPrivate({
        method: httpMethod,
        url: `/${apiEndPoint}`,
        data: reqData,
        withCredentials: true,
        responseType: responseType,
        headers: {
          "Content-Type": contypeType ? contypeType : "application/json",
          authorization: `Bearer ${state?.accessToken}`,
        },
      });

      if (isSuccessNotification?.notificationState && httpMethod !== "get") {
        notify({
          notificationText:
            isSuccessNotification?.notificationText || "Success",
          isURL: isSuccessNotification?.isURL || false,
          URL: isSuccessNotification?.URL || "",
          isTimer: isSuccessNotification?.isTimer || true,
          timer: timerDuration ? timerDuration : "3000",
          bgColour: isSuccessNotification?.bgColour,
          isNavigation: isSuccessNotification?.isNavigation || true,
          isRevalidate: isSuccessNotification?.isRevalidate || false,
          isRevaliddateURL: isSuccessNotification?.isRevaliddateURL,
        });
      }
      dispatch({type: 'ISLOADING_END'})
      return res?.data as errorResponse;
    } catch (error) {
            dispatch({type: 'ISLOADING_END'})
      if (error instanceof AxiosError) {
        if (httpMethod !== "get") {
           throw notify({
            notificationText:
              typeof error?.response?.data?.message === "string"
                ? error?.response?.data?.message
                : "Something went wrong, refresh browser or contact support",
            isURL: false,
            URL: ``,
            isTimer: false,
            isNavigation: false,
            timer: timerDuration ? timerDuration : "3000",
            isRevalidate: isSuccessNotification?.isRevalidate,
            isRevaliddateURL: isSuccessNotification?.isRevaliddateURL,
          });
        } else return;
      } else if (httpMethod !== "get") {
       throw notify({
          notificationText: "something went wrong",
          isURL: false,
          URL: ``,
          isTimer: false,
          isNavigation: false,
          timer: timerDuration ? timerDuration : "3000",
          isRevalidate: isSuccessNotification?.isRevalidate,
          isRevaliddateURL: isSuccessNotification?.isRevaliddateURL,
        });
      } else throw error;
    }
  };

  return {
    fetchIt,
  };
};

export const useSWRHook = (props: {
  cacheKey: string | null;
  apiEndPoint?: string;
  reqFucn?: any;
  httpMethod?: "get" | "post" | "patch" | "delete";
  isConditional?: boolean;
  conditionalStatement?: boolean;
  payload?: any;
}) => {
  const {
    cacheKey,
    apiEndPoint,
    reqFucn,
    isConditional,
    conditionalStatement,
    httpMethod,
    payload,
  } = props;

  const { fetchIt } = useHttpFetcher();

  const getData = async () => {
    try {
      const response = await fetchIt({
        apiEndPoint: `${apiEndPoint}`,
        httpMethod: httpMethod ? httpMethod : "get",
        reqData: payload,
        isSuccessNotification: {
          notificationState: false,
          notificationText: "",
        },
      });

      return response;
    } catch (error) {
      return;
    }
  };

  const {
    data: fetchData,
    error: fetchError,
    isLoading: fetchIsLoading,
    mutate,
  } = useSWR(
    isConditional ? (conditionalStatement ? cacheKey : null) : cacheKey,
    getData,
    { revalidateOnFocus: false }
  );

  return {
    fetchData,
    fetchError,
    fetchIsLoading,
    mutate,
  };
};

// an example of reaact hook that can be used to show notifications and should start with use function hook
export const useNotificationHook = () => {
  const { dispatch } = useContext(GlobalUseContext);
  const notify = (params: isNotificationPopAttributes) => {
    const {
      isTimer,
      timer,
      notificationState,
      notificationText,
      bgColour,
      textColour,
      isNavigation,
      isURL,
      URL,
      isRevalidate,
      isRevaliddateURL,
      showCancelButton,
      statusCode,
      event,
    } = params;

    dispatch({
      type: "SET_TOAST",
      payload: {
        notificationText,
        URL,
        isTimer,
        timer,
        isNavigation,
        notificationState,
        bgColour,
        textColour,
        isURL,
        isRevalidate,
        isRevaliddateURL,
        showCancelButton,
        statusCode,
        event,
      },
    });
  };

  return {
    notify,
  };
};
