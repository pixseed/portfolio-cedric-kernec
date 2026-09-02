import Header from "./layouts/Header/Header";

import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Journey from "./sections/Journey/Journey";
import Projects from "./sections/Projects/Projects";
import Skills from "./sections/Skills/Skills";
import Contact from "./sections/Contact/Contact";

import Footer from "./layouts/Footer/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
