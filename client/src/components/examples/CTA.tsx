import CTA from "../CTA";
import { ThemeProvider } from "../ThemeProvider";

export default function CTAExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="bg-background">
        <CTA />
      </div>
    </ThemeProvider>
  );
}
