import Header from "../Header";
import { ThemeProvider } from "../ThemeProvider";

export default function HeaderExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 px-6">
          <h1 className="text-4xl font-bold">Header Example</h1>
          <p className="mt-4 text-muted-foreground">
            Scroll down to see the glassmorphic header in action. Try the
            hamburger menu on mobile.
          </p>
          <div className="h-screen" />
        </div>
      </div>
    </ThemeProvider>
  );
}
