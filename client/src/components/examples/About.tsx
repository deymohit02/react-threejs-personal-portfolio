import About from "../About";
import { ThemeProvider } from "../ThemeProvider";

export default function AboutExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="bg-background">
        <About />
      </div>
    </ThemeProvider>
  );
}
