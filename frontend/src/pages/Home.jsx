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
import { feature} from '@/components/Data';

const Home = () => {
  
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
          <Link to="/dashboard" className="group">
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
        <span className='font-semibold text-lg '>Explore Now</span>
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
                