import { AnimatedFileInput } from "@/components/custom/InputFile";
import Records from "@/components/custom/Records";


export default function Home() {

  return (
    <>

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-8 items-center justify-center flex-col">
          <AnimatedFileInput />
        </div>
      </section>
      <Records/>

    </>
  );
}
