import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";

API.configure({
  endpoints: [
    {
      name: "Users",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/admin/user`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
    {
      name: "Model",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/admin/model`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
    {
      name: "Content",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/admin/content`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
    {
      name: "Access",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/admin/access`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
  ],
});
