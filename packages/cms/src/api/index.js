import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";

API.configure({
  endpoints: [
    {
      name: "Users",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/user`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
    {
      name: "Model",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/model`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
    {
      name: "Content",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/content`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
    {
      name: "Access",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/access`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
  ],
});
