import { Brain, Sword, Target, Timer, Users, Zap } from "lucide-react";
import WorldMap from "./ui/world-map";
import { motion } from "framer-motion";
import { AnimatedBeam } from "./ui/animated-beam";
import { createRef } from "react";

const containerRef = createRef(null);
const user1Ref = createRef(null);
const user2Ref = createRef(null);
const roomRef = createRef(null);
const groqRef = createRef(null);
const questionRef = createRef(null);
const competeRef = createRef(null);

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Battles",
      description: "Code against opponents in live coding challenges"
    },
    {
      icon: <Timer className="h-8 w-8" />,
      title: "Timed Challenges",
      description: "Test your skills under pressure with time-limited problems"
    },
    // {
    //   icon: <Trophy className="h-8 w-8" />,
    //   title: "Leaderboards",
    //   description: "Climb the ranks and showcase your coding prowess"
    // },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered",
      description: "Smart problem selection based on skill level"
    },{
      icon: <Sword className="h-8 w-8" />,
      title: "Competitive Coding",
      description: "Challenge others and prove your skills in head-to-head matches"
    }
  ];

  const stats = [
    { label: "Active Coders", value: "1K+", icon: <Users className="h-5 w-5" /> },
    { label: "Battles Fought", value: "5K+", icon: <Sword className="h-5 w-5" /> },
  //   { label: "Problems Solved", value: "100K+", icon: <Target className="h-5 w-5" /> },
   { label: "Problems Generated", value: "10K+", icon: <Target className="h-5 w-5" /> },
  
   
  ];
  
  const feedbacks = [
    {
      avatar: "🧑‍💻",
      name: "Aisha Khan",
      role: "Frontend Dev",
      quote: "CodeBattle helped me improve speed and accuracy in contests  ",
      rating: 5
    },
    {
      avatar: "🚀",
      name: "Marcus Lee",
      role: "Backend Engineer",
      quote: "Great platform for realistic, timed challenges — love the realtime battles.",
      rating: 5
    },
    {
      avatar: "✨",
      name: "Sofia Gomez",
      role: "Fullstack",
      quote: "The AI problem selection is spot on. I level up every week.",
      rating: 4
    },
    {
      avatar: "💡",
      name: "Ethan Brown",
      role: "Student",
      quote: "Fun, fast-paced and super addictive — perfect for practice!",
      rating: 5
    }
  ];

  const feature = [
    {
      name: "Code Battle Arena",
      className: "col-span-3",
      children: (
        <div className="relative h-full flex flex-col justify-between items-start p-6 md:p-8">
    
          {/* World Map Background */}
          <WorldMap/>
    
          {/* Top-left text block */}
          <div className="relative z-10 flex flex-col space-y-3 items-start">
            <h3 className="text-3xl md:text-4xl font-medium">
              <span className="bg-gradient-to-r from-white/60 via-white/70 to-white/50 bg-clip-text text-transparent font-semibold">
                Available in every country
              </span>
            </h3>
           
            <p className="text-white/80 text-base flex-wrap place-items-star leading-relaxe max-w-md mt-2">
              Access our platform from anywhere in the world with our globally distributed network.
            </p>
          </div>
    
          {/* Bottom-left statistics */}
          <div className="relative z-10 mt-auto flex flex-col items-start">
            <span className="text-2xl md:text-4xl font-light text-white">100+</span>
            <span className="text-2xl md:text-4xl tracking- font-light bg-gradient-to-r from-white/60 to-white/70 bg-clip-text text-transparent">
              Countries
            </span>
          </div>
        </div>
      ),
    }
    ,
    {
      name: "Community Voices",
      className: "col-span-3 md:col-span-1",
      children: (
        <div className="relative h-full p-4 flex flex-col justify-center space-y-4">
          <h3 className="text-xl bg-gradient-to-r from-white/60 via-white/70 to-white/50 bg-clip-text text-transparent font-semibold mb-4 ">Community</h3>
          <div className="space-y-4">
            {feedbacks.slice(0, 2).map((feedback, idx) => (
              <motion.div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300"
                style={{ 
                  transform: `rotate(${idx === 0 ? '-1deg' : '1deg'})`,
                  marginLeft: idx === 1 ? '1rem' : '0'
                }}
              >
                <p className="text-white/80 text-sm mb-2 italic">
                  "{feedback.quote}"
                </p>
                <p className="text-white/60 text-xs">
                  - {feedback.name}, {feedback.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Battle Flow",
      className: "col-span-3 md:col-span-2",
      children: (
        
        <div 
          ref={containerRef}
          className="relative h-full p-6 md:p-8 flex flex-col overflow-hidden"
        >
          {/* Top section - Title */}
          <div className="relative z-10 ">
            <h3 className="text-3xl md:text-4xl  ">
              <span className="bg-gradient-to-r from-white/60 via-white/70 to-white/50 bg-clip-text text-transparent font-semibold">Battle Flow</span>              
            </h3>
            {/* <p className="text-white/70 text-sm max-w-md">
              Two players join, AI generates a challenge, then compete in real-time.
            </p> */}
          </div>

          {/* Flow visualization */}
          <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
            {/* Top row - Users */}
            <div className="flex items-center justify-between px-4">
              {/* User 1 */}
              <div className="flex flex-col items-center space-y-2">
                <div 
                  ref={user1Ref}
                  className="w-12 h-12 rounded-full bg-white border-2  flex items-center justify-center backdrop-blur-sm shadow-lg shadow-blue-500/20"
                >
                  <Users className="h-5 w-5 text-black" />
                </div>
                <span className="text-xs font-medium text-white/80">Player 1</span>
              </div>

            </div>

            {/* Middle row - Groq */}
            <div  className='flex items-center justify-between px-4'>
              <div/>
            <div className="flex flex-col items-center space-y-2">
                <div 
                  ref={roomRef}
                  className="w-12 h-12 rounded-full bg-white border-2  flex items-center justify-center backdrop-blur-sm shadow-lg shadow-purple-500/20"
                >
                  <Target className="h-6 w-6 text-black" />
                </div>
                <span className="text-xs font-medium text-white/80">Room</span>
              </div>

               <div className="flex flex-col items-center space-y-2">
                <div 
                  ref={competeRef}
                  className="w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-red-500/20"
                >
                  <Sword className="h-5 w-5 text-black" />
                </div>
                <span className="text-xs font-medium text-white/80">Compete</span>
              </div>
              
                  <div className="flex flex-col items-center space-y-2">
                <div 
                  ref={groqRef}
                  className="w-12 h-12 rounded-full bg-white border-2  flex items-center justify-center backdrop-blur-sm shadow-lg shadow-purple-500/20"
                >
                <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
                </div>
                <span className="text-xs font-medium text-white/80">AI</span>
              </div>

            </div>

            {/* Bottom row - Question and Compete */}
            <div className="flex items-center justify-between px-4">
              {/* Question */}
              <div className="flex flex-col items-center space-y-2">
                <div 
                  ref={user2Ref}
                  className="w-12 h-12 rounded-full bg-white border-2  flex items-center justify-center backdrop-blur-sm shadow-lg shadow-pink-500/20"
                >
                  <Users className="h-5 w-5 text-black" />
                </div>
                <span className="text-xs font-medium text-white/80">Player 2</span>
              </div>

            </div>
          </div>

          {/* Animated Beams - Flow connections */}
          {/* User 1 → Room */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={user1Ref}
            toRef={roomRef}
            curvature={0}
            duration={4}
            delay={0}
            gradientStartColor="#10b981"
            gradientStopColor="#a855f7"
            pathWidth={2.5}
          />
          {/* User 2 → Room */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={user2Ref}
            toRef={roomRef}
            curvature={0}
            duration={4}
            delay={0}
            gradientStartColor="#10b981"
            gradientStopColor="#a855f7"
            pathWidth={2.5}
          />
          {/* Room → compete */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={roomRef}
            toRef={competeRef}
            curvature={0}
            duration={4}
            delay={0.4}
            gradientStartColor="#10b981"
            gradientStopColor="#a855f7"
            pathWidth={2.5}
          />
          {/* compete → groq */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={competeRef}
            toRef={groqRef}
            curvature={0}
            duration={4}
            delay={0.7}
            gradientStartColor="#10b981"
            gradientStopColor="#a855f7"
            pathWidth={2.5}
          />
          
        </div>
      ),
    },
  ]
  export { feature };