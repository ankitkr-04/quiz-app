import Image from 'next/image';
import AnimatedButton from '@/components/animatedButton';

const QuizIntro = () => {
  return (
    <div className="grid text-center max-w-4xl mx-auto justify-center p-6">
      <div className="flex items-center justify-center mb-6">
        <Image src='/hi.png' width={450} height={450} alt='quiz'/>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-gray-800">Test Your Knowledge</h1>
      <p className="text-lg text-gray-600 mb-6">
        Challenge yourself with our quiz and see how much you know!
      </p>

      <AnimatedButton text="Start Quiz" href="/user" />
    </div>
  );
}

export default QuizIntro;
