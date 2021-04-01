import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";

API.configure({
  endpoints: [
    {
      name: "Users",
      endpoint: `${process.env.REACT_APP_API_ENDPOINT}/users`,
      custom_header: async () => {
        const user = await Auth.currentSession();
        return {
          Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        };
      },
    },
  ],
});
