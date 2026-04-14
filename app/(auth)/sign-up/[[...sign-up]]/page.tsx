import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <SignUp
      appearance={{
        baseTheme: dark,
        elements: {
          headerSubtitle: {
            display: "block",
          },
        },
      }}
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      fallbackRedirectUrl="/home"
      forceRedirectUrl="/home"
    />
  );
}
