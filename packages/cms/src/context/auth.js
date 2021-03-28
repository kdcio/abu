import { createContext, useContext, useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import { USER_KEY } from "../constants";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cogUser, setCogUser] = useState(null);
  const [signUpUsername, setSignUpUsername] = useState(null);
  const [signUpPassword, setSignUpPassword] = useState(null);

  const saveUser = (cred) => {
    const { attributes, username } = cred;
    const u = { ...attributes, username };
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    return u;
  };

  useEffect(() => {
    const getUser = () => {
      setLoading(true);
      return Auth.currentAuthenticatedUser()
        .then((cred) => {
          const u = saveUser(cred);
          setUser(u);
          setLoading(false);
        })
        .catch((err) => {
          const u = localStorage.getItem(USER_KEY);
          if (u) setUser(JSON.parse(u));
          setLoading(false);
        });
    };

    getUser();
  }, [cogUser]);

  const loginGoogle = () =>
    Auth.federatedSignIn({ provider: "Google" }).catch((e) => {
      console.log(e);
    });

  const loginFacebook = () =>
    Auth.federatedSignIn({ provider: "Facebook" }).catch((e) => {
      console.log(e);
    });

  const login = async (username, password) => {
    const u = await Auth.signIn(username, password);
    setCogUser(u);
    if (u.challengeName === "NEW_PASSWORD_REQUIRED") {
      return "NEW_PASSWORD_REQUIRED";
    }
  };

  const newPassword = async (password, firstName, lastName) => {
    const u = await Auth.completeNewPassword(cogUser, password, {
      given_name: firstName,
      family_name: lastName,
    });
    setCogUser({ ...u });
  };

  const signUp = (username, password, firstName, lastName) => {
    setSignUpUsername(username);
    setSignUpPassword(password);
    return Auth.signUp({
      username,
      password,
      attributes: { given_name: firstName, family_name: lastName },
    });
  };

  const confirmSignUp = (code) => Auth.confirmSignUp(signUpUsername, code);

  const loginFromSignUp = async () => {
    const u = await Auth.signIn(signUpUsername, signUpPassword);
    setCogUser(u);
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem(USER_KEY);
    await Auth.signOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        newPassword,
        signUp,
        confirmSignUp,
        loginFromSignUp,
        loginGoogle,
        loginFacebook,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
