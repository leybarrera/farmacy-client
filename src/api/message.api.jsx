import { instance } from "./base.api";

export const messageEndpoint = {
  sendMessage: (message) => {
    return instance.post("/sendEmail", { ...message });
  },
};
