import { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";
interface IAuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle: () => Promise<void>;
}

interface IAuthResponse {
  params: {
    access_token: string;
    expires_in: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        "648094808617-8g99kprr1i2um32s22eo9h380tf8u1ua.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@danielbcarva/weFinance";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthResponse;

      if (type === "success") {
        setAuth(true);
        
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();
        setUser(userInfo);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, AuthContext, useAuth };
