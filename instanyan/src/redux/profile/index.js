import { useGetProfileQuery } from "./profileService";
import { setProfile, setExplore } from "./profileSlice";
import { followProfile } from "../reduxActions";

export {
    useGetProfileQuery,
    setProfile,
    setExplore,
    followProfile,
}