import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedWorks from '@/components/FeaturedWorks';
import OtherWorks from '@/components/OtherWorks';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedWorks />
      <OtherWorks />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
