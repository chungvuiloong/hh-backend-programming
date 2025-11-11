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

  export const SignedIn: (props: SignedInProps) => JSX.Element | null;
  export const SignedOut: (props: SignedOutProps) => JSX.Element | null;
  export const SignInButton: () => JSX.Element | null;
  export const UserButton: () => JSX.Element | null;
  export const ClerkProvider: (props: ClerkProviderProps) => JSX.Element | null;
}
