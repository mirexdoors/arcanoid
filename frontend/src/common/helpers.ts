import { AuthApiService } from '@/services/api.service';
import { resourceTypes } from "@/common/constants";

export const createResources = () => {
  return {
    [resourceTypes.AUTH]: new AuthApiService(),
  };
};
