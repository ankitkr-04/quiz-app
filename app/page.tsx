import Image from "next/image";
import AnimatedButton from "@/components/animatedButton";

const Home = () => {
  return (
    <div className="grid text-center max-w-4xl mx-auto justify-center">
      <Image className="mx-auto" src="/hi.png" alt="Quiz App" width={450} height={350} />
      <h2 className="mb-6">Greetings, trivia champions! Are your ready to showcase your knowledge?</h2>
      <AnimatedButton href="/user" text="Let's Start" />
    </div>
  );
}
export default Home;