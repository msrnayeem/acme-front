import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 md:py-16">
          {/* Left side content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Empower Your
              <br />
              Potential.
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg">
              Lorem ipsum dolor sit amet consectetur. At tortor et suspendisse
              et feugiat sed dictum maecenas.
            </p>
            <Link href="/shop">
              <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
            </Link>
          </div>

          {/* Right side images */}
          <div className="flex justify-center gap-4 ">
            {/* Product images */}
            <div className="flex flex-col justify-between">
              <div className="">
                <Image
                  src="/website/iphone.svg"
                  alt="Smartphone"
                  width={190}
                  height={390}
                  className="rounded"
                />
              </div>

              <div className="">
                <Image
                  src="/website/joystick.svg"
                  alt="Game Controller"
                  width={190}
                  height={210}
                  className="rounded"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div className="">
                <Image
                  src="/website/android-watch.svg"
                  alt="Smartwatch"
                  width={190}
                  height={210}
                  className="rounded-full"
                />
              </div>

              <div className="">
                <Image
                  src="/website/headphone.svg"
                  alt="Headphones"
                  width={190}
                  height={340}
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
