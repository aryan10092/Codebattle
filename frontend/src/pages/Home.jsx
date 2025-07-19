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
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Leaderboards",
      description: "Climb the ranks and showcase your coding prowess"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered",
      description: "Smart problem selection based on skill level"
    }
  ];

  const stats = [
    { label: "Active Coders", value: "1K+", icon: <Users className="h-5 w-5" /> },
    { label: "Battles Fought", value: "5K+", icon: <Sword className="h-5 w-5" /> },
  //   { label: "Problems Solved", value: "100K+", icon: <Target className="h-5 w-5" /> },
   { label: "Problems Generated", value: "10K+", icon: <Target className="h-5 w-5" /> },
  
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 flex justify-between items-center p-6 lg:px-12"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <Code2 className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            CodeBattle
          </span>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className='hover:text-gray-300 '>
            <button 
              className="px-5 py-2 rounded-lg text-gray-300 font-medium transition-colors duration-200  border border-purple-500/30 shadow-sm hover:bg-purple-500/8" 
              
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.nav>

     
      <motion.section 
        className="relative z-10 text-center py-32 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* <motion.div variants={itemVariants}>
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Sparkles className="h-4 w-4 mr-2" />
            Now in Beta
          </Badge>
        </motion.div> */}

          <div className="flex justify-center mb-8 flex-wrap gap-x-2">
            {["Code", "Compete", "Conquer"].map((word, idx) => (
              <motion.span
                key={word}
                className="text-5xl lg:text-7xl g font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
            delay: idx * 0.6,
            duration: 0.7,
           repeat: Infinity,
             repeatType: "reverse",
            repeatDelay: 1.5,
                }}
              >
                {word + " "}
              </motion.span>
            ))}
          </div>

          <motion.p 
            className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Enter the ultimate arena for competitive programming. Battle fellow coders in real-time, 
            solve challenging problems, and rise through the ranks.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
            <Play className="h-5 w-5 mr-2" />
            Start Your Journey
            <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/join">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-800 bg-gray-200 text-lg px-8 py-3">
            <Sword className="h-5 w-5 mr-2" />
            Join Battle
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center mb-2 text-purple-400">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="h-full bg-gray-900 border-none shadow-2xl hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg text-purple-400">
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
            className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-12 border border-purple-500/20 backdrop-blur-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Star className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              Ready to Test Your Skills?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers in the ultimate coding challenge platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
                    Create Account
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-gray-600 text-gray-800 bg-gray-200 text-lg px-8 py-3">
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="relative z-10 py-8 px-6 border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CodeBattle
            </span>
          </div>
          {/* <p className="text-gray-400">
            © 2025 CodeBattle. Built for competitive programmers, by competitive programmers.
          </p> */}
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
