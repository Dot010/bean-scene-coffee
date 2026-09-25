import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/buttons"

const Navbar = () => {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative h-12 w-40 ">
          <Image
            src="/images/beanscene.png"
            alt="Bean Scene"
            fill
            sizes="160px"
            className="object-contain"
            priority
          />
        </div>
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-serif text-coffee-cream md:flex">
        <Link href={'#home'}>Home</Link>
        <Link href={'#menu'}>Menu</Link>
        <Link href={'#about'}>About Us</Link>
        <Link href="#contact">Contact Us</Link>
      </nav>

      <div className="flex items-center gap-5">
        <Button 
        
         variant='ghost'
          href='#signIn'
        >
          Sign In
        </Button>
        <Button
          variant='primary'
          href='#signUp'
        >
          {' '}
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
