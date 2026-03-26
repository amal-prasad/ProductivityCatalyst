import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Placeholder for Hero and other sections */}
        <div className="h-[200vh] w-full pt-32 px-12 text-center text-white/50">
          Scroll down to see the custom cursor and lenis scrolling effect in action.
        </div>
      </main>
    </>
  );
}
