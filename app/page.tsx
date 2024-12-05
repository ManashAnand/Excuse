import { AnimatedFileInput } from "@/components/custom/InputFile";
import Textual from "@/components/custom/Textual";


export default function Home() {

  return (
    <>

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-8 items-center justify-center flex-col">
          {/* <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/> */}
          <AnimatedFileInput />
          <div className="text-center lg:w-2/3 w-full py-4 flex flex-col justify-center items-center">
              <Textual/>
          </div>
        </div>
      </section>
    </>
  );
}
