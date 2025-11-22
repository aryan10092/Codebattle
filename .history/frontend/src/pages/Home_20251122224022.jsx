    

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { 
  Code2, 
  Zap, 
  Users, 
  Trophy, 
  Timer, 
  Sword, 
  Brain, 
  Target,
  ArrowRight,
  Play,
  Star,
  Sparkles,
  Waypoints
} from 'lucide-react';
import ParticlesBackground from '@/components/Particlesbackground';
import { Marquee } from '@/components/ui/marquee';
import Navbar from '@/components/navbar';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { BentoCard,BentoGrid } from '@/components/ui/bento-grid';

import WorldMap from '@/components/ui/world-map';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { useRef } from 'react';

const Home = () => {
  const containerRef = useRef(null);
  const user1Ref = useRef(null);
  const user2Ref = useRef(null);
  const roomRef = useRef(null);
  const openaiRef = useRef(null);
  const questionRef = useRef(null);
  const competeRef = useRef(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

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
           
            <p className="text-white/80 text-base flex-wrap place-items-start leading-relaxed max-w-md mt-2">
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

            {/* Middle row - OpenAI */}
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
                  ref={openaiRef}
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
          {/* compete → openai */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={competeRef}
            toRef={openaiRef}
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
  return (
    <div className='bg-black text-white'>
    <Navbar/>
  
    <div className="min-h-screen overflow-hidden">
      
    
      {/* <ParticlesBackground/> */}
    
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 left-1/2 w-32 h-32 bg-gradient-to-br from-gray-700/40 to-gray-700/40 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      
    
      
   

      <div className='relativ fle  w-full '>
          <BackgroundRippleEffect rows={11} cellSize={68} 
          />
      </div>

      
      <motion.section 
        className="relative  text-center py-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge className="mb-6 bg-white/10 text-gray-300 border-gray-500/30 animate-pulse">
            <Sparkles className="h-4 w-4 mr-2 animate-spin text-gray-400" />
            Start Coding Now
          </Badge>
        </motion.div>
      
       <motion.h1
         className="text-5xl sm:text-8xl font-semibold mb-2 bg-gradient-to-r from-white/80 to-white bg-clip-text text-transparent drop-shadow-lg tracking-tight"
         initial={{ opacity: 0, y: 40, scale: 0.9 }}
         whileInView={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 0.8, type: "spring" }}
       >
         <span className="inline-block animate-fade-in-u">Elevate Your</span>
       </motion.h1>


       <motion.h1
         className="text-5xl sm:text-8xl font-semibold mb-6 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent drop-shadow tracking-tight"
         initial={{ opacity: 0, y: 40, scale: 0.9 }}
         whileInView={{ opacity: 1, y: 0, scale: 1.05, rotate: [2, 0] }}
         transition={{ delay: 0.3, duration: 0.9, type: "spring" }}
       >
         <span className="inline-block mb-4">Coding Game</span>
       </motion.h1>
        <motion.p 
          className="text-xl lg:text-xl text-white/60 mb-8 pt-2 max-w-xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Enter the ultimate arena for competitive programming. Battle fellow coders in real time, 
          solve challenging problems.
        </motion.p>
        {/* <motion.div 
          className="flex flex-col sm:flex-row gap- justify-center items-center mb-16 border "
          variants={itemVariants}
        > */}
        <motion.div  variants={itemVariants}
        className="mb-16 flex justify-center ">
          <Link to="/join" className="group">
            <motion.div
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-block mb-16 z-10"
            >
             

        <HoverBorderGradient
        containerClassName="rounded-full"
        as="div"
        role="button"
        tabIndex={0}
        className="bg-black text-white flex items-center space-x-2 px-10 py-1.5 cursor-pointer"
      >
        {/* <Sword className="h-5 w-5 mr-2 animate-pulse text-gray-400 " /> */}
        <span className='font-semibold text-lg '>Join Battle</span>
        {/* <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  <ArrowRight className="h-5 w-5 ml-2 text-gray-400 transition-colors duration-200 group-hover:text-gray-300" />
                </span> */}
      </HoverBorderGradient>
            </motion.div>
          </Link>
        </motion.div>

    
        <motion.div variants={itemVariants} className="mb-20">
          <BentoGrid>
            {feature.map((item, idx) => (
              <BentoCard key={idx} {...item} />
            ))}
          </BentoGrid>
        </motion.div>
        
        
      </motion.section>

      
      <motion.section 
        className="relative z-10 py-20 px-6 lg:px-12"
        initial={false}
      >
        <div className="max-w-full mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 40, opacity: 0,scale:0.95 }}
            whileInView={{ y: 0, opacity: 1, scale:1 }}
           viewport={{once:true}}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-4xl lg:text-6xl tracking-tight mb-4  animate-gradient-x">
            Beyond Expectations
            </h2>
            <p className="text-white/70 text-lg md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto">
              This AI platform has chaged the way of coding and problem solving.
            </p>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Marquee pauseOnHover className="[--duration:20s]" reverse>
              {[
                {
                  name: "Abhishek Sharma",
                  title: "CTO @ Tech Solutions",
                  quote: "Our team's productivity has increased significantly since we started using this platform",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alec"
                },
              
                {
                  name: "Jamie Lee",
                  title: "Founder @ Pulse",
                  quote: "The AI-powered code generation has transformed our development process.",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie"
                },
                {
                  name: "Shreya Mittal",
                  title: "Frontend Dev",
                  quote: "CodeBattle helped me improve speed and accuracy in coding contests.",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
                },
                {
                  name: "Marcus Lee",
                  title: "Backend Engineer",
                  quote: "Great platform for realistic, timed challenges — love the realtime battles.",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
                }
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 w-[400px] "
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className=" relative h-full rounded-xl bg-[#111010]    p-8 border border-white/10 shadow-xl">
                    <div className="flex flex-col h-full">
                      <p className="text-white text-lg md:text-2xl mb-6 leading- flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 p-0.5">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              ))}
            </Marquee>
            <div className="from-black pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-black pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
   
          </motion.div>
          
        </div>
      </motion.section>

     
      <motion.section 
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-[#111010] rounded-2xl p-12 border border-gray-500/20 backdrop-blur-sm shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Star className="h-12 w-12 text-white/80 mx-auto mb-6 animate-pulse" />
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">           Ready to Test Your Skills?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers in the ultimate coding challenge platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-g border border-[#605e5e] text-lg px-8 py-3 shadow-lg">
                    Create Account
                    <ArrowRight className="h-5 w-5 ml-2 text-gray-400" />
                  </Button>
                </motion.div>
              </Link>
              {/* <Link to="/login">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-gray-700 text-gray-200 bg-gray-900 text-lg px-8 py-3 shadow-lg">
                    Sign In
                  </Button>
                </motion.div>
              </Link> */}
            </div>
          </motion.div>
        </div>
      </motion.section>

      
      <motion.footer 
        className="relative z-10 py-8 px-6 border-t border-gray-800 bg-black/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-4 w-4 text-white/70" />
            <span className="text-md font-semibold text-white/70 animate-gradient-x">
              Made By Aryan Gupta
            </span>
          </div>
        </div>
      </motion.footer>
    </div></div>
  );

}
export default Home;
                