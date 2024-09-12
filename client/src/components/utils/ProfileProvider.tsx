import { setProfile } from "@/core/slices";
import { useAuth, useLayerFetch } from "@/hooks";
import { Client } from "@/types";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  useLayerFetch<Client>({
    callback: (res) => {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      if (res?.status === true) {
        dispatch(setProfile(res.data));
      } else {
        toast("Error occurred", {
          description: res?.message,
          action: {
            label: "Retry",
            onClick: () => console.log("Retry"),
          },
        });
      }
    },
    endpoint: "profile",
    feature: "client",
    method: "GET",
    accessToken: token,
    includeAccessToken: true,
  });

  return <>{children}</>;
};

export default ProfileProvider;
