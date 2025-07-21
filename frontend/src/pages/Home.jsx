import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Sparkles
} from 'lucide-react';
import ParticlesBackground from '@/components/Particlesbackground';

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
    },
    {
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
  return (
    
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticlesBackground/>
      
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

      
      <motion.nav 
        className="relative z-10 flex justify-between items-center p-6 lg:px-12"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.08, rotate: -2 }}
        >
          <Code2 className="h-8 w-8 text-gray-500 drop-shadow-lg" />
          <span className="text-2xl font-bold text-white bg-clip-text  bg-gradient-to-r from-gray-400 to-gray-300 animate-gradient-x">
            CodeBattle
          </span>
        </motion.div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className='hover:text-gray-300'>
            <button 
              className="px-6 py-1.5 rounded-lg bg-white text-black font-medium transition-colors duration-200 border border-gray-500/30 shadow-sm hover:bg-gray-300" 
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <Button className="bg-black border border-gray-700 hover:shadow-lg hover:shadow-gray-800 transition-shadow duration-200">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.nav>

      
      <motion.section 
        className="relative z-10 text-center py-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge className="mb-6 bg-gray-700/30 text-gray-300 border-gray-500/30 animate-pulse">
            <Sparkles className="h-4 w-4 mr-2 animate-spin text-gray-400" />
            Start Coding Now
          </Badge>
        </motion.div>
        {/* <div className="flex justify-center mb-8 flex-wrap gap-x-2">
          {["Code", "Compete", "Conquer"].map((word, idx) => (
            <motion.span
              key={word}
              className="text-5xl lg:text-7xl font-bold text-white bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 animate-gradient-x"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: idx * 0.5,
                duration: 0.7,
                repeatDelay: 1.5,
              }}
            >
              {word + " "}
            </motion.span>
          ))}
        </div> */}
       <motion.h1
         className="text-5xl sm:text-8xl font-bold mb-2 text-white drop-shadow-lg tracking-tight"
         initial={{ opacity: 0, y: 40, scale: 0.9 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 0.8, type: "spring" }}
       >
         <span className="inline-block animate-fade-in-u">Elevate Your</span>
       </motion.h1>

       <motion.h1
         className="text-5xl sm:text-8xl font-bold mb-6 text-gray-400 drop-shadow tracking-tight"
         initial={{ opacity: 0, y: 40, scale: 0.9 }}
         animate={{ opacity: 1, y: 0, scale: 1.05, rotate: [2, 0] }}
         transition={{ delay: 0.3, duration: 0.9, type: "spring" }}
       >
         <span className="inline-block animate-puls">Coding Game</span>
       </motion.h1>
        <motion.p 
          className="text-xl lg:text-2xl text-gray-200 mb-8 pt-5 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Enter the ultimate arena for competitive programming. Battle fellow coders in real-time, 
          solve challenging problems.
        </motion.p>
        {/* <motion.div 
          className="flex flex-col sm:flex-row gap- justify-center items-center mb-16 border "
          variants={itemVariants}
        > */}
        <motion.div  variants={itemVariants}
        lassName="mb-16 flex justify-center">
          <Link to="/join" className="group">
            <motion.div
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-block mb-16"
            >
              <span
                className="absolute pointer-events-none rounded-2xl border border-gray-700"
                style={{
                  inset: 0,
                }}
              ></span>
              <Button
                size="lg"
                className="relative z-10 bg-gray-900/8 hover:bg-gray-900/8 rounded-2xl text-lg px-12 py-7 shadow-2xl shadow-gray-700 flex items-center gap-2 border-none"
              >
                <Sword className="h-5 w-5 mr-2 animate-pulse text-gray-400 " />
                Join Battle
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  <ArrowRight className="h-5 w-5 ml-2 text-gray-400 transition-colors duration-200 group-hover:text-gray-300" />
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>


        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl shadow-lg p-6 border border-gray-800 hover:border-gray-500/40 transition-all"
              whileHover={{ scale: 1.07, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center mb-2 text-gray-400">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      
      <motion.section 
        className="relative z-10 py-20 px-6 lg:px-12"
        initial={false}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={false}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent animate-gradient-x">
              Why Choose CodeBattle?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the thrill of competitive programming with cutting-edge features
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.09,
                  rotateY: 8,
                  boxShadow: "0 0 32px 8px rgba(80,80,80,0.15)",
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-black border-none shadow-2xl hover:border-gray-500/50 transition-all duration-300 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-gray-700/30 to-gray-700/30 rounded-lg text-gray-400 shadow-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-center mt-4 mb-2 px-2 leading-relaxed text-sm">
                      <span className="block">{feature.description}</span>
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
            className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-2xl p-12 border border-gray-500/20 backdrop-blur-sm shadow-2xl"
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
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-6 animate-pulse" />
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">           Ready to Test Your Skills?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers in the ultimate coding challenge platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 text-lg px-8 py-3 shadow-lg">
                    Create Account
                    <ArrowRight className="h-5 w-5 ml-2 text-gray-400" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-gray-700 text-gray-200 bg-gray-900 text-lg px-8 py-3 shadow-lg">
                    Sign In
                  </Button>
                </motion.div>
              </Link>
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
            <Code2 className="h-6 w-6 text-gray-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent animate-gradient-x">
              CodeBattle
            </span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
export default Home;