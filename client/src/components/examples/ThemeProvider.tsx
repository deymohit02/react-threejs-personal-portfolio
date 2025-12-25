import { ThemeProvider } from "../ThemeProvider";
import { Button } from "@/components/ui/button";

export default function ThemeProviderExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="p-8 bg-background text-foreground">
        <h2 className="text-2xl font-bold mb-4">Theme Provider Example</h2>
        <p className="text-muted-foreground">
          The theme provider is working correctly. Toggle theme with the button
          in the header.
        </p>
      </div>
    </ThemeProvider>
  );
}
