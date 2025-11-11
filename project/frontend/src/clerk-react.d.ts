declare module '@clerk/clerk-react' {
  import { ReactNode } from 'react';

  
  export interface SignedInProps {
    children?: ReactNode;
  }

  export interface SignedOutProps {
    children?: ReactNode;
  }

  export interface ClerkProviderProps {
    publishableKey?: string;
    children?: ReactNode;
  }

  export interface GetTokenOptions {
    template?: string;
    leewayInSeconds?: number;
    skipCache?: boolean;
  }

  export interface SignOutOptions {
    redirectUrl?: string;
    sessionId?: string;
  }

  export type SignOutCallback = () => void | Promise<any>;

  export const useUser: () => {
    user: { id: string; [key: string]: any } | null | undefined;
    isSignedIn: boolean | undefined;
    isLoaded: boolean;
  };

  export const useAuth: () => {
    actor?: any;
    getToken: (options?: GetTokenOptions) => Promise<string | null>;
    has?: (params: { permission?: string; role?: string }) => boolean;
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    orgId: string | null | undefined;
    orgRole: string | null | undefined;
    orgSlug: string | null | undefined;
    sessionClaims?: any;
    sessionId: string | null | undefined;
    signOut: {
      (options?: SignOutOptions): Promise<void>;
      (signOutCallback?: SignOutCallback, options?: SignOutOptions): Promise<void>;
    };
    userId: string | null | undefined;
  };
  export const SignedIn: (props: SignedInProps) => JSX.Element | null;
  export const SignedOut: (props: SignedOutProps) => JSX.Element | null;
  export const SignInButton: () => JSX.Element | null;
  export const UserButton: () => JSX.Element | null;
  export const ClerkProvider: (props: ClerkProviderProps) => JSX.Element | null;
}
