import { useState, useEffect } from 'react';
import { 
  Menu, X, Moon, Sun, Search, Rocket, Heart, Brain, 
  ChartLine, Shield, Smartphone, Calendar, Users, 
  Sparkles, ArrowRight, Star, Quote, CheckCircle,
  Mail, Facebook, Twitter, Instagram, Linkedin,
  Lightbulb, Youtube, Target, CalendarCheck,
  Clock, Zap, TrendingUp,
  MessageCircle, Send, Calculator, DollarSign, 
  Activity, Scale, Flame, Lock, Shuffle, Briefcase,
  ChevronDown, ChevronUp, Download, Share2,
  Percent, Home, Droplets, Sun as SunIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  LifeExpectancyTool, SleepOptimizerTool, FitnessAgeTool, StressAnalyzerTool,
  BMICalculatorTool, CalorieCalculatorTool, WaterIntakeTool, IdealWeightTool,
  WealthSimulatorTool, RetirementCalculatorTool, CompoundInterestTool, InvestmentCalculatorTool,
  LoanCalculatorTool, MortgageCalculatorTool,
  EmailWriterTool, SocialVisualizerTool, LoveLanguageTool, ConversationStarterTool,
  GoalPlannerTool, HabitTrackerTool, DecisionMakerTool, DailyAffirmationTool,
  PromptGeneratorTool, YouTubeTitleTool, QuoteGeneratorTool, BusinessNameTool,
  TaskPrioritizerTool, TimeAnalyzerTool, PomodoroTimerTool, FocusBoosterTool,
  PasswordGeneratorTool, TipCalculatorTool, AgeCalculatorTool, RandomNumberTool
} from './tools';

// Types
interface Tool {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  component: React.ReactNode;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

// Theme Toggle Hook
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);
  
  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  return { theme, toggle };
}

// Cookie Consent Hook
function useCookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setShowConsent(true);
  }, []);
  
  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    toast.success('Cookies accepted!');
  };
  
  return { showConsent, accept };
}

// Navigation Component
function Navigation({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (p: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'AI Tools' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 group">
            <img src="/images/logo-3d.png" alt="Life in Weeks AI" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold gradient-text hidden sm:block">Life in Weeks AI</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`nav-link text-sm font-medium transition-colors ${currentPage === link.id ? 'text-[#e94560] active' : 'text-gray-700 dark:text-gray-300 hover:text-[#e94560]'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-yellow-400" />}
            </button>
            <Button onClick={() => setCurrentPage('tools')} className="hidden sm:flex btn-primary">
              <Rocket size={16} /> Explore Tools
            </Button>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in bg-white dark:bg-[#1a1a2e]">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { setCurrentPage(link.id); setIsOpen(false); }}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentPage === link.id ? 'bg-[#e94560]/10 text-[#e94560]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {link.label}
              </button>
            ))}
            <div className="px-4 pt-4">
              <Button onClick={() => { setCurrentPage('tools'); setIsOpen(false); }} className="w-full btn-primary">
                <Rocket size={16} /> Explore Tools
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// Cookie Consent Banner
function CookieConsentBanner({ show, onAccept }: { show: boolean; onAccept: () => void }) {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a1a2e] border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50 p-4 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <CookieIcon className="w-6 h-6 text-[#e94560] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
            <a href="#" className="text-xs text-[#e94560] hover:underline">Learn more about our Cookie Policy</a>
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Button onClick={onAccept} className="btn-primary text-sm py-2 px-4">
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="15" r="1.5" fill="currentColor" />
      <circle cx="16" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Hero Section
function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero-banner.jpg" alt="Background" className="w-full h-full object-cover" />
        <div className="hero-overlay" />
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20">
        <img src="/images/logo-3d.png" alt="Life in Weeks AI" className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 animate-float" />
        
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e94560]/20 border border-[#e94560]/40 rounded-full text-white text-sm font-semibold mb-6 backdrop-blur-sm">
          <Sparkles size={16} className="text-[#e94560]" />
          35+ AI-Powered Life Tools — 100% Free Forever
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
          Free AI Tools to Plan Your Life,<br />
          <span className="text-[#e94560]">Improve Productivity</span> & Grow Online
        </h1>
        
        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Transform your life journey with our collection of free AI-powered tools. 
          Visualize your life in weeks, optimize health & wealth, strengthen relationships, 
          and achieve your goals faster.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onExplore} className="btn-primary text-base">
            <Calendar size={18} /> See Your Life Calendar
          </button>
          <button onClick={onExplore} className="btn-secondary text-base">
            <Rocket size={18} /> Try AI Tools
          </button>
        </div>
        
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#00d9a5]" /> No signup required</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#00d9a5]" /> 100% Free</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#00d9a5]" /> Privacy First</span>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { number: '35+', label: 'AI Tools' },
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Insights Generated' },
    { number: '100%', label: 'Free Forever' },
  ];
  
  return (
    <section className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="stat-number text-3xl sm:text-4xl lg:text-5xl mb-2">{stat.number}</div>
              <div className="text-white/80 text-sm sm:text-base uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Life Calendar Section
function LifeCalendarSection() {
  const [birthDate, setBirthDate] = useState('1994-01-01');
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [showCalendar, setShowCalendar] = useState(false);
  const [stats, setStats] = useState({ weeksLived: 0, weeksRemaining: 0, yearsLived: 0, percentComplete: 0 });
  
  const generateCalendar = () => {
    const birth = new Date(birthDate);
    const today = new Date();
    const totalWeeks = lifeExpectancy * 52;
    
    const diffTime = today.getTime() - birth.getTime();
    const weeksLived = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const yearsLived = (weeksLived / 52).toFixed(1);
    const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
    const percentComplete = Math.min(100, ((weeksLived / totalWeeks) * 100));
    
    setStats({ weeksLived, weeksRemaining, yearsLived: parseFloat(yearsLived), percentComplete });
    setShowCalendar(true);
  };
  
  const exportResults = () => {
    const data = `Life Calendar Results
Generated: ${new Date().toLocaleString()}

Birth Date: ${birthDate}
Life Expectancy: ${lifeExpectancy} years

Statistics:
- Weeks Lived: ${stats.weeksLived.toLocaleString()}
- Weeks Remaining: ${stats.weeksRemaining.toLocaleString()}
- Years Lived: ${stats.yearsLived}
- Life Complete: ${stats.percentComplete.toFixed(1)}%

Remember: Make every week count!`;
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'life-calendar-results.txt';
    a.click();
    toast.success('Results exported!');
  };
  
  const weeks = Array.from({ length: lifeExpectancy * 52 }, (_, i) => i);
  const weeksLivedCount = stats.weeksLived;
  
  return (
    <section id="life-calendar" className="section bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl gradient-text mb-4">Your Life in Weeks</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See your entire lifespan visualized. Each square represents one week of your life.
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <CardContent className="p-6 lg:p-10">
            <div className="flex flex-wrap gap-4 items-end justify-center mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">Birth Date</label>
                <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="tool-input w-44" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Life Expectancy</label>
                <Input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(parseInt(e.target.value) || 85)} min={1} max={120} className="tool-input w-32" />
              </div>
              <Button onClick={generateCalendar} className="btn-primary">
                <Sparkles size={16} /> Generate Calendar
              </Button>
            </div>
            
            {showCalendar && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-[#e94560]">{stats.weeksLived.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Weeks Lived</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-[#00d9a5]">{stats.weeksRemaining.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Weeks Remaining</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-[#3498db]">{stats.yearsLived}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Years Lived</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-[#9b59b6]">{stats.percentComplete.toFixed(1)}%</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Life Complete</div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-3 mb-6">
                  <Button onClick={exportResults} variant="outline" className="flex items-center gap-2">
                    <Download size={16} /> Export Results
                  </Button>
                  <Button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} variant="outline" className="flex items-center gap-2">
                    <Share2 size={16} /> Share
                  </Button>
                </div>
                
                <div className="animate-fade-in">
                  <div className="weeks-grid bg-gray-100 dark:bg-gray-800">
                    {weeks.map((week) => (
                      <div key={week} className={`week ${week < weeksLivedCount ? 'lived' : 'remaining'}`} title={`Week ${week + 1}`} />
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[#e94560]" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Weeks Lived</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[#00d9a5]" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Weeks Remaining</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    { icon: <Brain size={32} />, title: '35+ AI Tools', description: 'Comprehensive suite covering health, wealth, relationships, and personal growth.' },
    { icon: <EyeIcon size={32} />, title: 'Life Visualization', description: 'See your entire lifespan as a grid of weeks for powerful perspective.' },
    { icon: <ChartLine size={32} />, title: 'Data-Driven Insights', description: 'Get personalized recommendations based on research and AI analysis.' },
    { icon: <InfinityIcon size={32} />, title: 'Completely Free', description: 'All tools are free forever. No subscriptions, no hidden fees.' },
    { icon: <Shield size={32} />, title: 'Privacy First', description: 'Your data stays on your device. We don\'t store personal information.' },
    { icon: <Smartphone size={32} />, title: 'Mobile Friendly', description: 'Access all tools from any device, anywhere, anytime.' },
  ];
  
  return (
    <section className="section bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl gradient-text mb-4">Why Choose Life in Weeks AI?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Powerful features designed to help you live with intention.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function EyeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function InfinityIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
  );
}

// Tool Categories Section
function ToolCategoriesSection({ onViewTools }: { onViewTools: () => void }) {
  const categories = [
    { id: 'health', icon: <Heart size={28} />, title: 'Health & Wellness', count: '10 tools', description: 'BMI, calories, sleep, fitness & more', color: 'from-[#00d9a5] to-[#00b894]' },
    { id: 'wealth', icon: <ChartLine size={28} />, title: 'Wealth & Finance', count: '8 tools', description: 'Investments, retirement & savings', color: 'from-[#9b59b6] to-[#8e44ad]' },
    { id: 'relationships', icon: <Users size={28} />, title: 'Relationships', count: '5 tools', description: 'Build stronger connections', color: 'from-[#3498db] to-[#2980b9]' },
    { id: 'growth', icon: <Target size={28} />, title: 'Personal Growth', count: '12+ tools', description: 'Goals, habits & productivity', color: 'from-[#e94560] to-[#ff6b6b]' },
  ];
  
  return (
    <section className="section bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl gradient-text mb-4">Explore Our AI Tools</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">35+ powerful tools organized by category to optimize every aspect of your life.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button key={cat.id} onClick={onViewTools} className="group text-left p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-[#e94560] transition-all duration-300 hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
              <Badge variant="secondary" className="mb-3">{cat.count}</Badge>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{cat.description}</p>
              <div className="mt-4 flex items-center text-[#e94560] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight size={16} className="ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    { number: '01', title: 'Choose a Tool', description: 'Browse our collection of 35+ AI-powered tools across health, wealth, relationships, and personal growth categories.' },
    { number: '02', title: 'Enter Your Info', description: 'Input your details into the tool. All data stays on your device - we never store or transmit your personal information.' },
    { number: '03', title: 'Get AI Insights', description: 'Receive personalized recommendations, calculations, and actionable insights powered by advanced AI algorithms.' },
    { number: '04', title: 'Take Action', description: 'Use the insights to make better decisions, set goals, and optimize different aspects of your life journey.' },
  ];
  
  return (
    <section className="section bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl gradient-text mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Getting started is easy. Follow these simple steps to transform your life with AI.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    { name: 'Sarah Mitchell', role: 'Productivity Coach', content: 'Life in Weeks AI completely changed my perspective on time. The life calendar visualization made me realize how precious each week is. I\'ve been using the goal planner and habit tracker daily!', avatar: 'SM', rating: 5 },
    { name: 'James Chen', role: 'Entrepreneur', content: 'The wealth planning tools are incredible. I was able to project my net worth growth and make better financial decisions. And it\'s all free - amazing!', avatar: 'JC', rating: 5 },
    { name: 'Emma Parker', role: 'Health Enthusiast', content: 'The health calculators and sleep optimizer have helped me improve my wellbeing significantly. The AI recommendations are spot-on and personalized.', avatar: 'EP', rating: 5 },
    { name: 'Michael Torres', role: 'Content Creator', content: 'The YouTube title generator and prompt generator save me hours every week. My video engagement has increased by 40% since using these tools!', avatar: 'MT', rating: 5 },
    { name: 'Lisa Wong', role: 'Financial Analyst', content: 'The investment calculator and compound interest tools are better than many paid apps. I recommend this to all my clients for personal finance planning.', avatar: 'LW', rating: 5 },
    { name: 'David Kim', role: 'Software Engineer', content: 'As someone who values privacy, I love that all calculations happen in my browser. No data collection, no accounts needed - just pure utility.', avatar: 'DK', rating: 5 },
  ];
  
  return (
    <section className="section bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl gradient-text mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Join 50,000+ people transforming their lives with our free AI tools.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={18} className="fill-[#ffc107] text-[#ffc107]" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed relative z-10">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FAQ[] = [
    { question: 'Is Life in Weeks AI really free?', answer: 'Yes! All 35+ AI tools are completely free to use. No credit card required, no hidden fees, and no premium tiers. We believe everyone deserves access to life optimization tools.' },
    { question: 'Do I need to create an account?', answer: 'No account is required. You can use all our tools immediately without providing any personal information like email, name, or password. Just visit the site and start using the tools.' },
    { question: 'Is my data safe and private?', answer: 'Absolutely! All calculations happen directly in your browser. Your data never leaves your device or gets sent to our servers. We have no way of accessing or storing your personal information.' },
    { question: 'How accurate are the AI tools?', answer: 'Our tools use well-researched formulas and algorithms. However, they are for informational purposes only and should not replace professional advice for medical, financial, or legal matters.' },
    { question: 'Can I use these tools on mobile?', answer: 'Yes! All our tools are fully responsive and work great on smartphones, tablets, and desktop computers. Access them from any device with a web browser.' },
    { question: 'How do I export or save my results?', answer: 'Most tools include an "Export" button that lets you download your results as a text file. You can also use the "Share" button to copy a link or share directly.' },
    { question: 'Are there any usage limits?', answer: 'No limits! Use the tools as much as you want, as often as you want. They\'re completely free and unlimited.' },
    { question: 'How can I support Life in Weeks AI?', answer: 'The best way to support us is by sharing the website with friends and family who might benefit from our tools. You can also follow us on social media!' },
  ];
  
  return (
    <section className="section bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl gradient-text mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Got questions? We've got answers.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'active' : ''}`}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="faq-question w-full text-left"
              >
                <span>{faq.question}</span>
                {openIndex === i ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              <div className="faq-answer">
                <p className="text-gray-600 dark:text-gray-400 pb-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast.success('Thanks for subscribing! Check your inbox for updates.');
    }
  };
  
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail size={48} className="mx-auto text-[#e94560] mb-6" />
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter for new tool releases, productivity tips, and exclusive content.
        </p>
        
        {subscribed ? (
          <div className="flex items-center justify-center gap-3 text-[#00d9a5]">
            <CheckCircle size={24} />
            <span className="text-lg">You're subscribed! Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#e94560]"
            />
            <Button type="submit" className="btn-primary px-8">
              <Send size={16} /> Subscribe
            </Button>
          </form>
        )}
        
        <p className="mt-4 text-white/50 text-sm">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

// CTA Section
function CTASection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Transform Your Life?</h2>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Start your journey today with our free AI-powered tools. Visualize your life, set meaningful goals, and make every week count.
        </p>
        <Button onClick={onGetStarted} className="btn-primary text-lg px-10 py-4">
          <Rocket size={20} /> Get Started Free
        </Button>
        <p className="mt-6 text-white/60 text-sm">No credit card required • No signup needed • 100% Free forever</p>
      </div>
    </section>
  );
}

// Footer Component
function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="bg-[#1a1a2e] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 mb-5">
              <img src="/images/logo-3d.png" alt="Life in Weeks AI" className="w-10 h-10" />
              <span className="text-xl font-bold">Life in Weeks AI</span>
            </button>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Helping you visualize, reflect on, and optimize your life journey with 35+ free AI-powered tools.
            </p>
            <div className="flex gap-3">
              <a href="#" className="social-link" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="social-link" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="social-link" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'AI Tools', 'Blog', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <button onClick={() => onNavigate(item.toLowerCase().replace(' ai tools', 'tools'))} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowRight size={14} /> {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-5">Categories</h4>
            <ul className="space-y-3">
              {['Health & Wellness', 'Wealth & Finance', 'Relationships', 'Personal Growth'].map(item => (
                <li key={item}>
                  <button onClick={() => onNavigate('tools')} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowRight size={14} /> {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-5">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map(item => (
                <li key={item}>
                  <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowRight size={14} /> {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Life in Weeks AI. All rights reserved. Made with ❤️ for everyone.</p>
        </div>
      </div>
    </footer>
  );
}

// Blog Page
function BlogPage() {
  const posts = [
    { id: '1', title: 'Best AI Tools for Productivity in 2026', excerpt: 'Discover the top AI-powered tools that can help you boost your productivity and achieve more in less time.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', date: 'Mar 5, 2026', category: 'Productivity', readTime: '5 min read' },
    { id: '2', title: 'How to Visualize Your Life Goals Effectively', excerpt: 'Learn powerful visualization techniques that can help you clarify your goals and create a roadmap for success.', image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80', date: 'Mar 3, 2026', category: 'Personal Growth', readTime: '7 min read' },
    { id: '3', title: 'The Science of Habit Formation', excerpt: 'Understanding the psychology behind habits and how to build positive routines that stick.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80', date: 'Feb 28, 2026', category: 'Health', readTime: '6 min read' },
    { id: '4', title: 'Free AI Tools for Content Creators', excerpt: 'A comprehensive list of free AI tools that every content creator should know about.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', date: 'Feb 25, 2026', category: 'Creativity', readTime: '8 min read' },
    { id: '5', title: 'Building Wealth with AI-Powered Planning', excerpt: 'How artificial intelligence is revolutionizing personal finance and wealth management.', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80', date: 'Feb 20, 2026', category: 'Wealth', readTime: '6 min read' },
    { id: '6', title: 'Improving Relationships Through Better Communication', excerpt: 'Practical tips and AI tools to help you communicate more effectively with loved ones.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', date: 'Feb 18, 2026', category: 'Relationships', readTime: '5 min read' },
  ];
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Life in Weeks AI Blog</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Insights, tips, and guides on productivity, personal growth, health, wealth, and relationships.</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Card key={post.id} className="blog-card overflow-hidden">
              <img src={post.image} alt={post.title} className="blog-image" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 hover:text-[#e94560] transition-colors cursor-pointer">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Button variant="ghost" className="text-[#e94560] hover:text-[#d63d56] p-0">Read More <ArrowRight size={16} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// About Page
function AboutPage() {
  const values = [
    { icon: <Heart size={24} />, title: 'Accessibility', description: 'All our tools are completely free. Everyone deserves access to life optimization resources.' },
    { icon: <Shield size={24} />, title: 'Privacy First', description: 'Your data never leaves your device. We prioritize your privacy above everything else.' },
    { icon: <Lightbulb size={24} />, title: 'Innovation', description: 'We continuously improve our AI tools using the latest research and technology.' },
    { icon: <Users size={24} />, title: 'Community', description: 'Building a community of people who support each other in living intentional lives.' },
    { icon: <TrendingUp size={24} />, title: 'Impact', description: 'We measure success by the positive impact on people\'s lives, not profits.' },
    { icon: <GlobeIcon size={24} />, title: 'Inclusivity', description: 'Our tools are designed for everyone, regardless of background or financial situation.' },
  ];
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#0a0a0a]">
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">About Life in Weeks AI</h1>
          <p className="text-lg text-white/80">We\'re on a mission to help people visualize their life journey, gain perspective, and live every week with intention.</p>
        </div>
      </div>
      
      <section className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white">
            <CardContent className="p-8 lg:p-12 text-center">
              <Quote size={48} className="mx-auto mb-6 opacity-50" />
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">"Make Every Week Count"</h2>
              <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">This is our guiding principle. We believe that by understanding the finite nature of time, we can make better decisions about how to spend our days.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="section bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl gradient-text mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="card-hover">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center text-white mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div><div className="text-4xl font-bold text-white mb-2">50K+</div><div className="text-white/70">Active Users</div></div>
            <div><div className="text-4xl font-bold text-white mb-2">35+</div><div className="text-white/70">AI Tools</div></div>
            <div><div className="text-4xl font-bold text-white mb-2">1M+</div><div className="text-white/70">Insights Generated</div></div>
            <div><div className="text-4xl font-bold text-white mb-2">100%</div><div className="text-white/70">Free Forever</div></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GlobeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Contact Page
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-white/80">Have a question or feedback? We\'d love to hear from you.</p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card><CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center text-white mb-4"><Mail size={24} /></div>
              <h3 className="font-bold mb-1">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">hello@lifeinweeks.ai</p>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d9a5] to-[#00b894] rounded-xl flex items-center justify-center text-white mb-4"><MessageCircle size={24} /></div>
              <h3 className="font-bold mb-1">Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">support@lifeinweeks.ai</p>
            </CardContent></Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card><CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="mx-auto text-[#00d9a5] mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">We\'ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="contact-input" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="contact-input" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="contact-input" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="contact-input min-h-[150px] w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4" placeholder="Tell us more about your inquiry..." />
                  </div>
                  <Button type="submit" className="w-full btn-primary py-4"><Send size={18} /> Send Message</Button>
                </form>
              )}
            </CardContent></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { showConsent, accept } = useCookieConsent();
  
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection onExplore={() => setCurrentPage('tools')} />
            <StatsSection />
            <LifeCalendarSection />
            <FeaturesSection />
            <ToolCategoriesSection onViewTools={() => setCurrentPage('tools')} />
            <HowItWorksSection />
            <TestimonialsSection />
            <FAQSection />
            <NewsletterSection />
            <CTASection onGetStarted={() => setCurrentPage('tools')} />
          </>
        );
      case 'tools':
        return <ToolsPage />;
      case 'blog':
        return <BlogPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <HeroSection onExplore={() => setCurrentPage('tools')} />
            <StatsSection />
            <LifeCalendarSection />
            <FeaturesSection />
            <ToolCategoriesSection onViewTools={() => setCurrentPage('tools')} />
            <HowItWorksSection />
            <TestimonialsSection />
            <FAQSection />
            <NewsletterSection />
            <CTASection onGetStarted={() => setCurrentPage('tools')} />
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="pt-0">{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
      
      <button onClick={scrollToTop} className={`scroll-top ${showScrollTop ? 'visible' : ''}`} aria-label="Scroll to top">
        <ArrowRight size={24} className="rotate-[-90deg]" />
      </button>
      
      <CookieConsentBanner show={showConsent} onAccept={accept} />
    </div>
  );
}

// Tools Page Component
function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', label: 'All Tools', icon: <Sparkles size={16} /> },
    { id: 'health', label: 'Health', icon: <Heart size={16} /> },
    { id: 'wealth', label: 'Wealth', icon: <ChartLine size={16} /> },
    { id: 'relationships', label: 'Relationships', icon: <Users size={16} /> },
    { id: 'growth', label: 'Growth', icon: <Target size={16} /> },
    { id: 'creativity', label: 'Creativity', icon: <Lightbulb size={16} /> },
    { id: 'productivity', label: 'Productivity', icon: <Zap size={16} /> },
    { id: 'utilities', label: 'Utilities', icon: <Calculator size={16} /> },
  ];
  
  const tools: Tool[] = [
    // Health Tools
    { id: 'life-expectancy', name: 'Life Expectancy AI', category: 'health', icon: <Heart size={20} />, description: 'Predict your potential lifespan based on lifestyle factors', component: <LifeExpectancyTool /> },
    { id: 'sleep-optimizer', name: 'Sleep Optimization AI', category: 'health', icon: <Clock size={20} />, description: 'Analyze and improve your sleep quality', component: <SleepOptimizerTool /> },
    { id: 'fitness-age', name: 'Fitness Age Calculator', category: 'health', icon: <Target size={20} />, description: 'Calculate your biological vs chronological age', component: <FitnessAgeTool /> },
    { id: 'stress-analyzer', name: 'Stress Pattern Analyzer', category: 'health', icon: <Brain size={20} />, description: 'Identify stress triggers and get coping strategies', component: <StressAnalyzerTool /> },
    { id: 'bmi-calculator', name: 'BMI Calculator', category: 'health', icon: <Scale size={20} />, description: 'Calculate your Body Mass Index and health status', component: <BMICalculatorTool /> },
    { id: 'calorie-calculator', name: 'Calorie Calculator', category: 'health', icon: <Flame size={20} />, description: 'Calculate daily calorie needs for your goals', component: <CalorieCalculatorTool /> },
    { id: 'water-intake', name: 'Water Intake Calculator', category: 'health', icon: <Droplets size={20} />, description: 'Calculate optimal daily water consumption', component: <WaterIntakeTool /> },
    { id: 'ideal-weight', name: 'Ideal Weight Calculator', category: 'health', icon: <Activity size={20} />, description: 'Find your healthy weight range', component: <IdealWeightTool /> },
    
    // Wealth Tools
    { id: 'wealth-simulator', name: 'Wealth Timeline Simulator', category: 'wealth', icon: <ChartLine size={20} />, description: 'Project your net worth growth over time', component: <WealthSimulatorTool /> },
    { id: 'retirement-calc', name: 'Retirement Calculator', category: 'wealth', icon: <CalendarCheck size={20} />, description: 'Plan your path to financial freedom', component: <RetirementCalculatorTool /> },
    { id: 'compound-interest', name: 'Compound Interest Calculator', category: 'wealth', icon: <Percent size={20} />, description: 'See the power of compound interest', component: <CompoundInterestTool /> },
    { id: 'investment-calc', name: 'Investment Calculator', category: 'wealth', icon: <TrendingUp size={20} />, description: 'Calculate investment returns and growth', component: <InvestmentCalculatorTool /> },
    { id: 'loan-calculator', name: 'Loan Calculator', category: 'wealth', icon: <DollarSign size={20} />, description: 'Calculate loan payments and interest', component: <LoanCalculatorTool /> },
    { id: 'mortgage-calc', name: 'Mortgage Calculator', category: 'wealth', icon: <Home size={20} />, description: 'Estimate monthly mortgage payments', component: <MortgageCalculatorTool /> },
    
    // Relationship Tools
    { id: 'email-writer', name: 'AI Email Writer', category: 'relationships', icon: <Mail size={20} />, description: 'Generate professional emails instantly', component: <EmailWriterTool /> },
    { id: 'social-visualizer', name: 'Social Circle Visualizer', category: 'relationships', icon: <Users size={20} />, description: 'Map and analyze your connections', component: <SocialVisualizerTool /> },
    { id: 'love-language', name: 'Love Language Quiz', category: 'relationships', icon: <Heart size={20} />, description: 'Discover your primary love language', component: <LoveLanguageTool /> },
    { id: 'conversation-starter', name: 'Conversation Starter', category: 'relationships', icon: <MessageCircle size={20} />, description: 'Get interesting conversation topics', component: <ConversationStarterTool /> },
    
    // Growth Tools
    { id: 'goal-planner', name: 'AI Goal Planner', category: 'growth', icon: <Target size={20} />, description: 'Create actionable plans to achieve your goals', component: <GoalPlannerTool /> },
    { id: 'habit-tracker', name: 'AI Habit Tracker', category: 'growth', icon: <CalendarCheck size={20} />, description: 'Build and maintain positive habits', component: <HabitTrackerTool /> },
    { id: 'decision-maker', name: 'Decision Maker', category: 'growth', icon: <Shuffle size={20} />, description: 'Make tough decisions with pros/cons analysis', component: <DecisionMakerTool /> },
    { id: 'daily-affirmation', name: 'Daily Affirmation', category: 'growth', icon: <SunIcon size={20} />, description: 'Get personalized daily affirmations', component: <DailyAffirmationTool /> },
    
    // Creativity Tools
    { id: 'prompt-generator', name: 'AI Prompt Generator', category: 'creativity', icon: <Lightbulb size={20} />, description: 'Generate creative AI prompts for any purpose', component: <PromptGeneratorTool /> },
    { id: 'youtube-titles', name: 'YouTube Title Generator', category: 'creativity', icon: <Youtube size={20} />, description: 'Create engaging YouTube video titles', component: <YouTubeTitleTool /> },
    { id: 'quote-generator', name: 'Quote Generator', category: 'creativity', icon: <Quote size={20} />, description: 'Get inspiring quotes for any occasion', component: <QuoteGeneratorTool /> },
    { id: 'business-name', name: 'Business Name Generator', category: 'creativity', icon: <Briefcase size={20} />, description: 'Generate creative business name ideas', component: <BusinessNameTool /> },
    
    // Productivity Tools
    { id: 'task-prioritizer', name: 'Task Prioritizer AI', category: 'productivity', icon: <CheckCircle size={20} />, description: 'Prioritize your tasks for maximum efficiency', component: <TaskPrioritizerTool /> },
    { id: 'time-analyzer', name: 'Time Usage Analyzer', category: 'productivity', icon: <Clock size={20} />, description: 'Analyze and optimize how you spend your time', component: <TimeAnalyzerTool /> },
    { id: 'pomodoro-timer', name: 'Pomodoro Timer', category: 'productivity', icon: <TimerIcon size={20} />, description: 'Stay focused with the Pomodoro technique', component: <PomodoroTimerTool /> },
    { id: 'focus-booster', name: 'Focus Booster', category: 'productivity', icon: <Zap size={20} />, description: 'Get tips to improve concentration', component: <FocusBoosterTool /> },
    
    // Utility Tools
    { id: 'password-generator', name: 'Password Generator', category: 'utilities', icon: <Lock size={20} />, description: 'Generate secure random passwords', component: <PasswordGeneratorTool /> },
    { id: 'tip-calculator', name: 'Tip Calculator', category: 'utilities', icon: <DollarSign size={20} />, description: 'Calculate tips and split bills', component: <TipCalculatorTool /> },
    { id: 'age-calculator', name: 'Age Calculator', category: 'utilities', icon: <Calculator size={20} />, description: 'Calculate exact age in years, months, days', component: <AgeCalculatorTool /> },
    { id: 'random-number', name: 'Random Number Generator', category: 'utilities', icon: <Shuffle size={20} />, description: 'Generate random numbers for any range', component: <RandomNumberTool /> },
  ];
  
  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">35+ AI-Powered Life Tools</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore our comprehensive collection of free AI tools designed to help you optimize every aspect of your life journey.
          </p>
        </div>
      </div>
      
      <div className="sticky top-16 lg:top-20 z-40 bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-xl mx-auto mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              type="text"
              placeholder="Search AI tools (e.g., 'health', 'sleep', 'goals')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-[#e94560]"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <Dialog key={tool.id}>
              <DialogTrigger asChild>
                <Card className="tool-card cursor-pointer group">
                  <CardContent className="p-0">
                    <div className={`tool-header ${tool.category}`}>
                      <div className={`tool-icon ${tool.category}`}>{tool.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-[#e94560] transition-colors">{tool.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <Badge variant="outline" className="capitalize">{tool.category}</Badge>
                      <span className="text-[#e94560] text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Try Now <ArrowRight size={14} />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${tool.category}`}>{tool.icon}</div>
                    {tool.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">{tool.component}</div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Timer Icon
function TimerIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Tool Components (continued in next part due to length)

export default App;
