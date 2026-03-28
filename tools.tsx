import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Download, Share2, Copy, Play, Pause, RotateCcw } from 'lucide-react';

// Export/Share helper
const exportResult = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  toast.success('Results exported!');
};

const shareResult = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success('Link copied to clipboard!');
};

const copyResult = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard!');
};

// Tool Response Component with Actions
function ToolResponse({ children, exportData, exportFilename = 'results.txt' }: { children: React.ReactNode; exportData?: string; exportFilename?: string }) {
  return (
    <div className="tool-response">
      {children}
      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {exportData && (
          <Button onClick={() => exportResult(exportFilename, exportData)} variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={14} /> Export
          </Button>
        )}
        <Button onClick={shareResult} variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 size={14} /> Share
        </Button>
      </div>
    </div>
  );
}

// Health Tools
export function LifeExpectancyTool() {
  const [age, setAge] = useState(30);
  const [lifestyle, setLifestyle] = useState(7);
  const [smoking, setSmoking] = useState(false);
  const [exercise, setExercise] = useState('moderate');
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    let baseExpectancy = 78;
    const lifestyleBonus = (lifestyle - 5) * 2.5;
    const ageFactor = Math.max(0, (age - 30) * -0.3);
    const smokingPenalty = smoking ? -10 : 0;
    const exerciseBonus = { none: -3, light: 0, moderate: 2, intense: 4 };
    
    const expectancy = Math.round(baseExpectancy + lifestyleBonus + ageFactor + smokingPenalty + (exerciseBonus[exercise as keyof typeof exerciseBonus] || 0));
    const yearsLeft = expectancy - age;
    
    const tips = [];
    if (lifestyle < 6) tips.push('Consider improving your diet and reducing stress.');
    if (smoking) tips.push('Quitting smoking could add 10 years to your life.');
    if (exercise === 'none') tips.push('Adding regular exercise could extend your lifespan.');
    
    const resultText = `Based on your profile:
• Estimated Life Expectancy: ${expectancy} years
• Years Remaining: ${yearsLeft} years
• Weeks Remaining: ${(yearsLeft * 52).toLocaleString()} weeks

${tips.length > 0 ? 'Recommendations:\n• ' + tips.join('\n• ') : 'Great job! Keep maintaining your healthy lifestyle!'}`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Current Age</label>
        <Input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Lifestyle Score (1-10)</label>
        <input type="range" min="1" max="10" value={lifestyle} onChange={(e) => setLifestyle(parseInt(e.target.value))} className="w-full" />
        <div className="text-center font-semibold text-[#e94560]">{lifestyle}/10</div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Do you smoke?</label>
        <div className="flex gap-4">
          <button onClick={() => setSmoking(true)} className={`px-4 py-2 rounded-lg border ${smoking ? 'bg-[#e94560] text-white border-[#e94560]' : 'border-gray-300'}`}>Yes</button>
          <button onClick={() => setSmoking(false)} className={`px-4 py-2 rounded-lg border ${!smoking ? 'bg-[#00d9a5] text-white border-[#00d9a5]' : 'border-gray-300'}`}>No</button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Exercise Level</label>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)} className="tool-input">
          <option value="none">None</option>
          <option value="light">Light (1-2x/week)</option>
          <option value="moderate">Moderate (3-4x/week)</option>
          <option value="intense">Intense (5+ x/week)</option>
        </select>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Lifespan</Button>
      {result && <ToolResponse exportData={result} exportFilename="life-expectancy-results.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function SleepOptimizerTool() {
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState(6);
  const [bedtime, setBedtime] = useState('23:00');
  const [result, setResult] = useState<string | null>(null);
  
  const optimize = () => {
    let advice = [];
    let sleepScore = quality;
    
    if (hours < 7) { advice.push('Aim for 7-9 hours of sleep'); sleepScore -= 2; }
    if (hours > 9) { advice.push('Oversleeping can cause grogginess'); }
    if (quality < 5) { advice.push('Improve sleep environment (cooler, darker, quieter)'); }
    if (parseInt(bedtime.split(':')[0]) > 23) { advice.push('Try going to bed earlier (before 11 PM)'); }
    
    const bedtimeHour = parseInt(bedtime.split(':')[0]);
    const wakeTime = `${(bedtimeHour + 8) % 24}:00`;
    
    const resultText = `Sleep Analysis:
• Current Sleep: ${hours} hours
• Sleep Quality: ${quality}/10
• Sleep Score: ${Math.max(0, sleepScore)}/10

Recommendations:
${advice.length > 0 ? '• ' + advice.join('\n• ') : '• Your sleep habits look good!'}

Optimal Schedule:
• Bedtime: ${bedtime}
• Wake up: ${wakeTime}
• Sleep cycles: ~${Math.round(hours * 60 / 90)} cycles`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Average Sleep Hours</label>
        <Input type="number" step="0.5" value={hours} onChange={(e) => setHours(parseFloat(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Sleep Quality (1-10)</label>
        <input type="range" min="1" max="10" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full" />
        <div className="text-center font-semibold text-[#e94560]">{quality}/10</div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Typical Bedtime</label>
        <Input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} className="tool-input" />
      </div>
      <Button onClick={optimize} className="w-full btn-primary">Optimize Sleep</Button>
      {result && <ToolResponse exportData={result} exportFilename="sleep-optimization.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function FitnessAgeTool() {
  const [chronologicalAge, setChronologicalAge] = useState(30);
  const [exerciseFreq, setExerciseFreq] = useState('weekly');
  const [restingHR, setRestingHR] = useState(70);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const freqBonus = { rarely: 5, weekly: 0, regular: -4, daily: -7 };
    const hrBonus = restingHR < 60 ? -3 : restingHR < 70 ? -1 : restingHR < 80 ? 1 : 3;
    
    const fitnessAge = Math.max(18, chronologicalAge + (freqBonus[exerciseFreq as keyof typeof freqBonus] || 0) + hrBonus);
    const diff = chronologicalAge - fitnessAge;
    
    const resultText = `Fitness Age Analysis:
• Chronological Age: ${chronologicalAge} years
• Fitness Age: ${fitnessAge} years
• Difference: ${diff > 0 ? `${diff} years younger` : diff < 0 ? `${Math.abs(diff)} years older` : 'Same as chronological age'}

${diff > 3 ? 'Excellent! Your fitness level is above average.' : diff > 0 ? 'Good job! Keep up the exercise.' : 'Consider increasing physical activity to improve your fitness age.'}`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Chronological Age</label>
        <Input type="number" value={chronologicalAge} onChange={(e) => setChronologicalAge(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Exercise Frequency</label>
        <select value={exerciseFreq} onChange={(e) => setExerciseFreq(e.target.value)} className="tool-input">
          <option value="rarely">Rarely</option>
          <option value="weekly">1-3 times/week</option>
          <option value="regular">4-5 times/week</option>
          <option value="daily">Daily</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Resting Heart Rate (bpm)</label>
        <Input type="number" value={restingHR} onChange={(e) => setRestingHR(parseInt(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Fitness Age</Button>
      {result && <ToolResponse exportData={result} exportFilename="fitness-age.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function StressAnalyzerTool() {
  const [stressLevel, setStressLevel] = useState(5);
  const [triggers, setTriggers] = useState('');
  const [sleep, setSleep] = useState(7);
  const [result, setResult] = useState<string | null>(null);
  
  const analyze = () => {
    const strategies = [
      'Practice deep breathing: 4-7-8 technique',
      'Take 5-minute mindfulness breaks',
      'Exercise for at least 20 minutes daily',
      'Limit caffeine and alcohol',
      'Try progressive muscle relaxation',
      'Journal your thoughts and feelings',
      'Connect with friends or family',
      'Consider meditation or yoga'
    ];
    
    const selectedStrategies = strategies.sort(() => 0.5 - Math.random()).slice(0, 4);
    const triggerList = triggers ? triggers.split(',').map(t => t.trim()) : [];
    
    const resultText = `Stress Analysis Report:
• Current Stress Level: ${stressLevel}/10 (${stressLevel > 7 ? 'High' : stressLevel > 4 ? 'Moderate' : 'Low'})
• Sleep Hours: ${sleep}
${triggerList.length > 0 ? `• Identified Triggers: ${triggerList.join(', ')}` : ''}

Recommended Coping Strategies:
${selectedStrategies.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${sleep < 6 ? '\nNote: Poor sleep can increase stress levels. Prioritize rest!' : ''}`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Current Stress Level (1-10)</label>
        <input type="range" min="1" max="10" value={stressLevel} onChange={(e) => setStressLevel(parseInt(e.target.value))} className="w-full" />
        <div className="text-center font-semibold text-[#e94560]">{stressLevel}/10</div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Sleep Hours (last night)</label>
        <Input type="number" step="0.5" value={sleep} onChange={(e) => setSleep(parseFloat(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Main Stress Triggers (comma-separated)</label>
        <Input type="text" value={triggers} onChange={(e) => setTriggers(e.target.value)} placeholder="e.g., Work, Finances, Family" className="tool-input" />
      </div>
      <Button onClick={analyze} className="w-full btn-primary">Analyze Stress</Button>
      {result && <ToolResponse exportData={result} exportFilename="stress-analysis.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function BMICalculatorTool() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    
    let category = '';
    let advice = '';
    if (parseFloat(bmi) < 18.5) { category = 'Underweight'; advice = 'Consider consulting a nutritionist for a healthy weight gain plan.'; }
    else if (parseFloat(bmi) < 25) { category = 'Normal weight'; advice = 'Great! Maintain your healthy lifestyle.'; }
    else if (parseFloat(bmi) < 30) { category = 'Overweight'; advice = 'Regular exercise and balanced diet can help.'; }
    else { category = 'Obese'; advice = 'Consider consulting a healthcare provider for guidance.'; }
    
    const resultText = `BMI Results:
• Height: ${height} cm
• Weight: ${weight} kg
• BMI: ${bmi}
• Category: ${category}

${advice}

Healthy BMI Range: 18.5 - 24.9`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Height (cm)</label>
        <Input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Weight (kg)</label>
        <Input type="number" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate BMI</Button>
      {result && <ToolResponse exportData={result} exportFilename="bmi-results.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function CalorieCalculatorTool() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const bmr = gender === 'male' 
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    
    const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
    const tdee = Math.round(bmr * (activityMultipliers[activity as keyof typeof activityMultipliers] || 1.55));
    
    const goalAdjustments = { lose: -500, maintain: 0, gain: 500 };
    const targetCalories = tdee + (goalAdjustments[goal as keyof typeof goalAdjustments] || 0);
    
    const resultText = `Daily Calorie Needs:
• BMR (Basal Metabolic Rate): ${Math.round(bmr)} calories
• TDEE (Total Daily Energy): ${tdee} calories
• Target for ${goal === 'lose' ? 'weight loss' : goal === 'gain' ? 'weight gain' : 'maintenance'}: ${targetCalories} calories

Macronutrient Distribution:
• Protein: ${Math.round(targetCalories * 0.3 / 4)}g
• Carbs: ${Math.round(targetCalories * 0.4 / 4)}g
• Fats: ${Math.round(targetCalories * 0.3 / 9)}g`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <Input type="number" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (cm)</label>
          <Input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="tool-input" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <Input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="tool-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Activity Level</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value)} className="tool-input">
          <option value="sedentary">Sedentary (desk job)</option>
          <option value="light">Light (1-2 days exercise)</option>
          <option value="moderate">Moderate (3-5 days exercise)</option>
          <option value="active">Active (daily exercise)</option>
          <option value="veryActive">Very Active (athlete)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Goal</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="tool-input">
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Calories</Button>
      {result && <ToolResponse exportData={result} exportFilename="calorie-needs.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function WaterIntakeTool() {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState('moderate');
  const [climate, setClimate] = useState('temperate');
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const baseIntake = weight * 0.033;
    const activityBonus = { low: 0, moderate: 0.3, high: 0.6 };
    const climateBonus = { cold: 0, temperate: 0.1, hot: 0.4 };
    
    const totalLiters = baseIntake + (activityBonus[activity as keyof typeof activityBonus] || 0) + (climateBonus[climate as keyof typeof climateBonus] || 0);
    const glasses = Math.round(totalLiters * 4);
    
    const resultText = `Daily Water Intake Recommendation:
• Weight: ${weight} kg
• Recommended: ${totalLiters.toFixed(1)} liters (${glasses} glasses)

Hydration Schedule:
• Morning (7-9 AM): 2 glasses
• Mid-morning (10-11 AM): 1 glass
• Lunch (12-1 PM): 1 glass
• Afternoon (2-4 PM): 2 glasses
• Evening (5-7 PM): 1 glass
• Night (8-9 PM): 1 glass

Tips: Drink before meals, carry a water bottle, and eat water-rich foods.`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Weight (kg)</label>
        <Input type="number" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Activity Level</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value)} className="tool-input">
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Climate</label>
        <select value={climate} onChange={(e) => setClimate(e.target.value)} className="tool-input">
          <option value="cold">Cold</option>
          <option value="temperate">Temperate</option>
          <option value="hot">Hot/Humid</option>
        </select>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Water Needs</Button>
      {result && <ToolResponse exportData={result} exportFilename="water-intake.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function IdealWeightTool() {
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState('male');
  const [frame, setFrame] = useState('medium');
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const baseWeight = gender === 'male' ? (height - 100) * 0.9 : (height - 100) * 0.85;
    const frameAdjustments = { small: -3, medium: 0, large: 3 };
    const idealWeight = Math.round(baseWeight + (frameAdjustments[frame as keyof typeof frameAdjustments] || 0));
    
    const resultText = `Ideal Weight Analysis:
• Height: ${height} cm
• Gender: ${gender}
• Frame Size: ${frame}

Results:
• Ideal Weight: ${idealWeight} kg
• Healthy Range: ${idealWeight - 5} - ${idealWeight + 5} kg
• BMI at Ideal Weight: ${(idealWeight / Math.pow(height/100, 2)).toFixed(1)}

Note: This is an estimate. Consult a healthcare provider for personalized advice.`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Height (cm)</label>
        <Input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="tool-input">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Frame Size</label>
        <select value={frame} onChange={(e) => setFrame(e.target.value)} className="tool-input">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Ideal Weight</Button>
      {result && <ToolResponse exportData={result} exportFilename="ideal-weight.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

// Wealth Tools
export function WealthSimulatorTool() {
  const [age, setAge] = useState(30);
  const [monthlySavings, setMonthlySavings] = useState(500);
  const [returnRate, setReturnRate] = useState(7);
  const [result, setResult] = useState<string | null>(null);
  
  const simulate = () => {
    const years = 65 - age;
    const monthlyRate = returnRate / 100 / 12;
    const months = years * 12;
    const futureValue = monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalContributed = monthlySavings * months;
    const interestEarned = futureValue - totalContributed;
    
    const resultText = `Wealth Simulation Results:
• Starting Age: ${age}
• Monthly Savings: $${monthlySavings}
• Annual Return: ${returnRate}%
• Years to Retirement: ${years}

Projected Results at Age 65:
• Total Contributions: $${Math.round(totalContributed).toLocaleString()}
• Interest Earned: $${Math.round(interestEarned).toLocaleString()}
• Total Value: $${Math.round(futureValue).toLocaleString()}

The power of compound interest: Your money grows exponentially over time!`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Current Age</label>
        <Input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Monthly Savings ($)</label>
        <Input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Expected Annual Return (%)</label>
        <Input type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(parseFloat(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={simulate} className="w-full btn-primary">Simulate Wealth</Button>
      {result && <ToolResponse exportData={result} exportFilename="wealth-simulation.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function RetirementCalculatorTool() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const yearsLeft = retirementAge - currentAge;
    const monthsLeft = yearsLeft * 12;
    const projectedSavings = currentSavings + (monthlyContribution * monthsLeft);
    const weeksLeft = yearsLeft * 52;
    
    const resultText = `Retirement Planning Analysis:
• Current Age: ${currentAge}
• Target Retirement Age: ${retirementAge}
• Years Until Retirement: ${yearsLeft}
• Weeks Until Retirement: ${weeksLeft.toLocaleString()}

Financial Projection:
• Current Savings: $${currentSavings.toLocaleString()}
• Monthly Contribution: $${monthlyContribution}
• Projected Savings: $${projectedSavings.toLocaleString()}

Recommendation: 
${monthlyContribution < 1000 ? 'Consider increasing your monthly contribution for a more comfortable retirement.' : 'Great savings rate! Keep it up!'}`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Current Age</label>
          <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(parseInt(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Retirement Age</label>
          <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(parseInt(e.target.value))} className="tool-input" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Current Savings ($)</label>
        <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Monthly Contribution ($)</label>
        <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(parseInt(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Retirement</Button>
      {result && <ToolResponse exportData={result} exportFilename="retirement-plan.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function CompoundInterestTool() {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const futureValue = principal * Math.pow(1 + monthlyRate, months) + monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalContributed = principal + (monthlyContribution * months);
    const interestEarned = futureValue - totalContributed;
    
    const resultText = `Compound Interest Calculation:
• Principal: $${principal.toLocaleString()}
• Monthly Contribution: $${monthlyContribution}
• Annual Rate: ${rate}%
• Time Period: ${years} years

Results:
• Total Contributed: $${Math.round(totalContributed).toLocaleString()}
• Interest Earned: $${Math.round(interestEarned).toLocaleString()}
• Final Value: $${Math.round(futureValue).toLocaleString()}
• Growth: ${((futureValue / totalContributed - 1) * 100).toFixed(1)}%

Compound interest is the 8th wonder of the world!`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Initial Principal ($)</label>
        <Input type="number" value={principal} onChange={(e) => setPrincipal(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Monthly Contribution ($)</label>
        <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Annual Rate (%)</label>
          <Input type="number" step="0.5" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Years</label>
          <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="tool-input" />
        </div>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Compound Interest</Button>
      {result && <ToolResponse exportData={result} exportFilename="compound-interest.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function InvestmentCalculatorTool() {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(8);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const futureValue = amount * Math.pow(1 + returnRate / 100, years);
    const profit = futureValue - amount;
    
    const yearlyBreakdown = [];
    for (let i = 1; i <= Math.min(years, 10); i++) {
      yearlyBreakdown.push(`Year ${i}: $${Math.round(amount * Math.pow(1 + returnRate / 100, i)).toLocaleString()}`);
    }
    
    const resultText = `Investment Growth Projection:
• Initial Investment: $${amount.toLocaleString()}
• Time Period: ${years} years
• Expected Return: ${returnRate}%/year

Results:
• Final Value: $${Math.round(futureValue).toLocaleString()}
• Total Profit: $${Math.round(profit).toLocaleString()}
• ROI: ${((profit / amount) * 100).toFixed(1)}%

${years <= 10 ? 'Yearly Breakdown:\n' + yearlyBreakdown.join('\n') : ''}`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Investment Amount ($)</label>
        <Input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Years</label>
          <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Expected Return (%)</label>
          <Input type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(parseFloat(e.target.value))} className="tool-input" />
        </div>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Returns</Button>
      {result && <ToolResponse exportData={result} exportFilename="investment-returns.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function LoanCalculatorTool() {
  const [amount, setAmount] = useState(20000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;
    
    const resultText = `Loan Payment Calculation:
• Loan Amount: $${amount.toLocaleString()}
• Interest Rate: ${rate}%
• Loan Term: ${years} years

Results:
• Monthly Payment: $${monthlyPayment.toFixed(2)}
• Total Payment: $${totalPayment.toFixed(2)}
• Total Interest: $${totalInterest.toFixed(2)}

Note: This is an estimate. Actual payments may vary based on fees and other factors.`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Loan Amount ($)</label>
        <Input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
          <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Loan Term (years)</label>
          <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="tool-input" />
        </div>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Payments</Button>
      {result && <ToolResponse exportData={result} exportFilename="loan-payments.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(30);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - loanAmount;
    
    const resultText = `Mortgage Calculation:
• Home Price: $${homePrice.toLocaleString()}
• Down Payment: $${downPayment.toLocaleString()} (${((downPayment/homePrice)*100).toFixed(1)}%)
• Loan Amount: $${loanAmount.toLocaleString()}
• Interest Rate: ${rate}%
• Loan Term: ${years} years

Monthly Payment: $${monthlyPayment.toFixed(2)}

Total Costs:
• Total Payment: $${totalPayment.toFixed(2)}
• Total Interest: $${totalInterest.toFixed(2)}

Note: Does not include property taxes, insurance, or HOA fees.`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Home Price ($)</label>
        <Input type="number" value={homePrice} onChange={(e) => setHomePrice(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Down Payment ($)</label>
        <Input type="number" value={downPayment} onChange={(e) => setDownPayment(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
          <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Loan Term (years)</label>
          <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="tool-input" />
        </div>
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Mortgage</Button>
      {result && <ToolResponse exportData={result} exportFilename="mortgage-calculation.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

// Relationship Tools
export function EmailWriterTool() {
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState('professional');
  const [recipient, setRecipient] = useState('');
  const [result, setResult] = useState<string | null>(null);
  
  const generate = () => {
    const templates: Record<string, (p: string, r: string) => string> = {
      professional: (p, r) => `Subject: ${p}\n\nDear ${r || '[Name]'},\n\nI hope this email finds you well. I am writing regarding ${p}.\n\n[Add your details here]\n\nPlease let me know if you need any additional information.\n\nBest regards,\n[Your Name]`,
      casual: (p, r) => `Subject: ${p}\n\nHi ${r || '[Name]'},\n\nJust wanted to reach out about ${p}.\n\n[Add your details here]\n\nLet me know what you think!\n\nCheers,\n[Your Name]`,
      formal: (p, r) => `Subject: ${p}\n\nTo ${r || 'Whom It May Concern'},\n\nI am writing to formally address ${p}.\n\n[Add your details here]\n\nI look forward to your response.\n\nSincerely,\n[Your Name]`
    };
    
    setResult(templates[tone]?.(purpose, recipient) || templates.professional(purpose, recipient));
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Email Purpose</label>
        <Input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g., Meeting request, Follow-up" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Recipient Name (optional)</label>
        <Input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g., John Smith" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Tone</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)} className="tool-input">
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
        </select>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Generate Email</Button>
      {result && (
        <ToolResponse>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          <Button onClick={() => copyResult(result)} className="mt-3 btn-primary text-sm py-2">
            <Copy size={14} /> Copy Email
          </Button>
        </ToolResponse>
      )}
    </div>
  );
}

export function SocialVisualizerTool() {
  const [connections, setConnections] = useState(50);
  const [closeFriends, setCloseFriends] = useState(5);
  const [result, setResult] = useState<string | null>(null);
  
  const visualize = () => {
    const acquaintanceRatio = Math.round((connections - closeFriends) / closeFriends);
    const categories = Math.ceil(connections / 15);
    
    const resultText = `Social Network Analysis:
• Total Connections: ${connections}
• Close Friends: ${closeFriends}
• Acquaintances: ${connections - closeFriends}
• Ratio: ${acquaintanceRatio}:1 (acquaintances to close friends)
• Estimated Social Circles: ${categories}

Insights:
${closeFriends < 3 ? '• Consider nurturing deeper friendships' : '• Good balance of close relationships'}
${connections > 100 ? '• Large network - focus on quality over quantity' : '• Manageable network size'}

Dunbar's Number: Humans can maintain ~150 stable relationships.`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Total Connections</label>
        <Input type="number" value={connections} onChange={(e) => setConnections(parseInt(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Close Friends</label>
        <Input type="number" value={closeFriends} onChange={(e) => setCloseFriends(parseInt(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={visualize} className="w-full btn-primary">Visualize Network</Button>
      {result && <ToolResponse exportData={result} exportFilename="social-network.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function LoveLanguageTool() {
  const [qa, setQa] = useState([3, 3, 3, 3, 3]);
  const [result, setResult] = useState<string | null>(null);
  
  const questions = [
    'I feel loved when receiving gifts',
    'Quality time together is most important to me',
    'Words of affirmation mean a lot to me',
    'Physical touch makes me feel connected',
    'Acts of service show me love'
  ];
  
  const languages = ['Receiving Gifts', 'Quality Time', 'Words of Affirmation', 'Physical Touch', 'Acts of Service'];
  
  const calculate = () => {
    const maxIndex = qa.indexOf(Math.max(...qa));
    const primary = languages[maxIndex];
    
    const resultText = `Your Love Language Profile:

Primary Love Language: ${primary}

Scores:
${languages.map((l, i) => `• ${l}: ${qa[i]}/5`).join('\n')}

What This Means:
${primary === 'Receiving Gifts' ? 'You appreciate thoughtful presents and tokens of affection.' : ''}
${primary === 'Quality Time' ? 'You value undivided attention and shared experiences.' : ''}
${primary === 'Words of Affirmation' ? 'You need to hear "I love you" and verbal appreciation.' : ''}
${primary === 'Physical Touch' ? 'Hugs, holding hands, and physical closeness matter most.' : ''}
${primary === 'Acts of Service' ? 'Actions speak louder than words - help with tasks shows love.' : ''}

Share this with your partner to improve communication!`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Rate each statement (1 = Disagree, 5 = Agree)</p>
      {questions.map((q, i) => (
        <div key={i}>
          <label className="block text-sm mb-1">{q}</label>
          <input type="range" min="1" max="5" value={qa[i]} onChange={(e) => {
            const newQa = [...qa];
            newQa[i] = parseInt(e.target.value);
            setQa(newQa);
          }} className="w-full" />
          <div className="text-center text-sm text-[#e94560]">{qa[i]}/5</div>
        </div>
      ))}
      <Button onClick={calculate} className="w-full btn-primary">Discover My Love Language</Button>
      {result && <ToolResponse exportData={result} exportFilename="love-language.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function ConversationStarterTool() {
  const [category, setCategory] = useState('general');
  const [result, setResult] = useState<string[] | null>(null);
  
  const starters: Record<string, string[]> = {
    general: ['What\'s the best thing that happened to you this week?', 'If you could travel anywhere right now, where would you go?', 'What\'s a skill you\'d love to learn?', 'What\'s your favorite way to relax?'],
    deep: ['What\'s something you\'re really proud of?', 'If you could change one thing about the world, what would it be?', 'What\'s a lesson you learned the hard way?', 'What does success mean to you?'],
    fun: ['What\'s the most embarrassing thing that\'s happened to you?', 'If you were a superhero, what would your power be?', 'What\'s your guilty pleasure?', 'What\'s the weirdest food you\'ve ever tried?'],
    professional: ['What inspired you to choose your career?', 'What\'s the best career advice you\'ve received?', 'What project are you most proud of?', 'Where do you see yourself in 5 years?']
  };
  
  const generate = () => {
    setResult(starters[category] || starters.general);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Conversation Type</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="tool-input">
          <option value="general">General</option>
          <option value="deep">Deep/Meaningful</option>
          <option value="fun">Fun/Lighthearted</option>
          <option value="professional">Professional</option>
        </select>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Get Conversation Starters</Button>
      {result && (
        <div className="tool-response">
          <ul className="space-y-3">
            {result.map((starter, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#e94560] font-bold">{i + 1}.</span>
                <span>{starter}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Growth Tools
export function GoalPlannerTool() {
  const [goal, setGoal] = useState('');
  const [timeline, setTimeline] = useState('3 months');
  const [category, setCategory] = useState('personal');
  const [result, setResult] = useState<string | null>(null);
  
  const plan = () => {
    const timelines: Record<string, string[]> = {
      '1 month': ['Week 1: Research and set baseline', 'Week 2: Start daily actions', 'Week 3: First progress check', 'Week 4: Review and adjust'],
      '3 months': ['Month 1: Build foundation and habits', 'Month 2: Increase intensity', 'Month 3: Push toward completion'],
      '6 months': ['Months 1-2: Learning phase', 'Months 3-4: Implementation', 'Months 5-6: Optimization and mastery'],
      '1 year': ['Q1: Foundation building', 'Q2: Skill development', 'Q3: Application', 'Q4: Mastery and review']
    };
    
    const milestones = timelines[timeline] || timelines['3 months'];
    
    const resultText = `Goal Plan: ${goal}

Category: ${category}
Timeline: ${timeline}

SMART Goal Framework:
• Specific: ${goal}
• Measurable: Track progress weekly
• Achievable: Break into small steps
• Relevant: Aligns with your ${category} goals
• Time-bound: ${timeline}

Milestones:
${milestones.map((m, i) => `${i + 1}. ${m}`).join('\n')}

Tips:
• Write your goal down daily
• Share with an accountability partner
• Celebrate small wins
• Review and adjust weekly`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Goal</label>
        <Input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., Learn Spanish, Lose 10kg" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="tool-input">
          <option value="personal">Personal</option>
          <option value="career">Career</option>
          <option value="health">Health</option>
          <option value="financial">Financial</option>
          <option value="relationships">Relationships</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Timeline</label>
        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="tool-input">
          <option value="1 month">1 month</option>
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
          <option value="1 year">1 year</option>
        </select>
      </div>
      <Button onClick={plan} className="w-full btn-primary">Create Plan</Button>
      {result && <ToolResponse exportData={result} exportFilename="goal-plan.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function HabitTrackerTool() {
  const [habit, setHabit] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [duration, setDuration] = useState(21);
  const [result, setResult] = useState<string | null>(null);
  
  const track = () => {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    
    const resultText = `Habit Tracker: ${habit}

Frequency: ${frequency}
Duration: ${duration} days
Start Date: ${startDate.toLocaleDateString()}
Target End Date: ${endDate.toLocaleDateString()}

The 21/90 Rule:
• 21 days to build a habit
• 90 days to build a lifestyle

Tracking Tips:
• Use a physical calendar or app
• Don't break the chain
• If you miss a day, start again immediately
• Reward yourself at milestones (7, 21, 60, 90 days)

Daily Checklist:
[ ] ${habit} completed today
[ ] Logged in tracker
[ ] Celebrated the win

Remember: Progress, not perfection!`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Habit Name</label>
        <Input type="text" value={habit} onChange={(e) => setHabit(e.target.value)} placeholder="e.g., Read 30 minutes, Exercise" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Frequency</label>
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="tool-input">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="weekdays">Weekdays only</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Target Duration (days)</label>
        <Input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={track} className="w-full btn-primary">Track Habit</Button>
      {result && <ToolResponse exportData={result} exportFilename="habit-tracker.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function DecisionMakerTool() {
  const [decision, setDecision] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [result, setResult] = useState<string | null>(null);
  
  const analyze = () => {
    const prosList = pros.split('\n').filter(p => p.trim());
    const consList = cons.split('\n').filter(c => c.trim());
    const score = prosList.length - consList.length;
    
    const resultText = `Decision Analysis: ${decision}

Pros (${prosList.length}):
${prosList.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Cons (${consList.length}):
${consList.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Score: ${score > 0 ? '+' : ''}${score}

Recommendation: ${score > 2 ? 'Strongly consider doing it!' : score > 0 ? 'Leaning toward yes' : score === 0 ? 'Consider both sides carefully' : score > -2 ? 'Leaning toward no' : 'Strongly reconsider'}

Remember: Sometimes the best decision is the one you commit to fully.`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Decision to Make</label>
        <Input type="text" value={decision} onChange={(e) => setDecision(e.target.value)} placeholder="e.g., Should I change jobs?" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Pros (one per line)</label>
        <Textarea value={pros} onChange={(e) => setPros(e.target.value)} placeholder="Higher salary&#10;Better location&#10;Growth opportunities" className="tool-input min-h-[80px]" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Cons (one per line)</label>
        <Textarea value={cons} onChange={(e) => setCons(e.target.value)} placeholder="Leaving comfort zone&#10;Unknown team&#10;Longer commute" className="tool-input min-h-[80px]" />
      </div>
      <Button onClick={analyze} className="w-full btn-primary">Analyze Decision</Button>
      {result && <ToolResponse exportData={result} exportFilename="decision-analysis.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function DailyAffirmationTool() {
  const [mood, setMood] = useState('neutral');
  const [focus, setFocus] = useState('general');
  const [result, setResult] = useState<string | null>(null);
  
  const affirmations: Record<string, Record<string, string[]>> = {
    happy: {
      general: ['I radiate positive energy and attract good things.', 'My happiness is contagious and lifts others up.', 'I am grateful for all the joy in my life.'],
      career: ['My enthusiasm drives my success.', 'I bring positive energy to every project.', 'My passion inspires those around me.']
    },
    neutral: {
      general: ['I am capable of amazing things.', 'Every day is a fresh start.', 'I choose to focus on what I can control.'],
      career: ['I am growing stronger every day.', 'Challenges help me become better.', 'I have everything I need to succeed.']
    },
    stressed: {
      general: ['This too shall pass.', 'I am stronger than my challenges.', 'I choose peace over worry.'],
      career: ['I handle pressure with grace.', 'One step at a time is enough.', 'I trust in my ability to figure things out.']
    }
  };
  
  const generate = () => {
    const options = affirmations[mood]?.[focus] || affirmations.neutral.general;
    const affirmation = options[Math.floor(Math.random() * options.length)];
    
    const resultText = `Your Daily Affirmation:

"${affirmation}"

💡 Tip: Repeat this affirmation 3 times while looking in the mirror.

📝 Journal Prompt: How does this affirmation make you feel?

Have a wonderful day! ✨`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Current Mood</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)} className="tool-input">
          <option value="happy">Happy/Excited</option>
          <option value="neutral">Neutral</option>
          <option value="stressed">Stressed/Anxious</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Focus Area</label>
        <select value={focus} onChange={(e) => setFocus(e.target.value)} className="tool-input">
          <option value="general">General</option>
          <option value="career">Career/Work</option>
        </select>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Get Affirmation</Button>
      {result && (
        <ToolResponse>
          <pre className="whitespace-pre-wrap text-lg font-medium text-center py-4">{result}</pre>
          <Button onClick={() => copyResult(result)} className="mt-3 btn-primary text-sm py-2">
            <Copy size={14} /> Copy Affirmation
          </Button>
        </ToolResponse>
      )}
    </div>
  );
}

// Creativity Tools
export function PromptGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('creative');
  const [result, setResult] = useState<string | null>(null);
  
  const generate = () => {
    const prompts: Record<string, string[]> = {
      creative: [`Write a creative story about ${topic} with a surprising twist.`, `Create a vivid description of ${topic} using all five senses.`, `Imagine ${topic} from an alien's perspective visiting Earth.`],
      business: [`Develop a marketing strategy for ${topic} targeting Gen Z.`, `Create a SWOT analysis for a ${topic} startup.`, `Write an elevator pitch for a ${topic} business.`],
      educational: [`Explain ${topic} as if teaching a 10-year-old.`, `Create a lesson plan about ${topic} with activities.`, `Develop 5 quiz questions about ${topic}.`],
      coding: [`Write a Python script that demonstrates ${topic}.`, `Explain ${topic} with code examples.`, `Create a tutorial for beginners on ${topic}.`]
    };
    
    const selected = prompts[type] || prompts.creative;
    const randomPrompt = selected[Math.floor(Math.random() * selected.length)];
    
    setResult(randomPrompt);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Topic/Subject</label>
        <Input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Space travel, Coffee, Leadership" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Prompt Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="tool-input">
          <option value="creative">Creative Writing</option>
          <option value="business">Business/Marketing</option>
          <option value="educational">Educational</option>
          <option value="coding">Coding/Technical</option>
        </select>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Generate Prompt</Button>
      {result && (
        <ToolResponse>
          <p className="text-lg">{result}</p>
          <Button onClick={() => copyResult(result)} className="mt-3 btn-primary text-sm py-2">
            <Copy size={14} /> Copy Prompt
          </Button>
        </ToolResponse>
      )}
    </div>
  );
}

export function YouTubeTitleTool() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('clickbait');
  const [result, setResult] = useState<string[] | null>(null);
  
  const generate = () => {
    const titles: Record<string, string[]> = {
      clickbait: [`I Tried ${topic} for 30 Days... SHOCKING Results!`, `The TRUTH About ${topic} Nobody Talks About`, `${topic} Changed My Life (Here's Why)`, `I Spent $1000 on ${topic}... Worth It?`],
      educational: [`The Complete Guide to ${topic} for Beginners`, `Everything About ${topic} Explained`, `${topic} in 10 Minutes`, `How to Master ${topic}: Tutorial`],
      storytelling: [`My Journey With ${topic}: From Zero to Hero`, `How ${topic} Saved My Business`, `The Day I Discovered ${topic}`, `${topic}: My Story`]
    };
    
    setResult(titles[style] || titles.clickbait);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Video Topic</label>
        <Input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Vegan diet, Productivity" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Title Style</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)} className="tool-input">
          <option value="clickbait">Clickbait/Engaging</option>
          <option value="educational">Educational</option>
          <option value="storytelling">Storytelling</option>
        </select>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Generate Titles</Button>
      {result && (
        <div className="tool-response">
          <ul className="space-y-2">
            {result.map((title, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-[#e94560] font-bold">{i + 1}.</span>
                <span>{title}</span>
                <Button onClick={() => copyResult(title)} variant="ghost" size="sm" className="ml-auto">
                  <Copy size={14} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function QuoteGeneratorTool() {
  const [category, setCategory] = useState('motivation');
  const [result, setResult] = useState<string | null>(null);
  
  const quotes: Record<string, string[]> = {
    motivation: ['The only way to do great work is to love what you do. - Steve Jobs', 'Believe you can and you\'re halfway there. - Theodore Roosevelt', 'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill'],
    wisdom: ['The only true wisdom is in knowing you know nothing. - Socrates', 'In the middle of difficulty lies opportunity. - Albert Einstein', 'Life is what happens when you\'re busy making other plans. - John Lennon'],
    happiness: ['Happiness is not something ready-made. It comes from your own actions. - Dalai Lama', 'The purpose of our lives is to be happy. - Dalai Lama', 'Count your age by friends, not years. Count your life by smiles, not tears. - John Lennon'],
    success: ['Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau', 'Don\'t watch the clock; do what it does. Keep going. - Sam Levenson', 'The secret of success is to do the common thing uncommonly well. - John D. Rockefeller Jr.']
  };
  
  const generate = () => {
    const options = quotes[category] || quotes.motivation;
    setResult(options[Math.floor(Math.random() * options.length)]);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Quote Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="tool-input">
          <option value="motivation">Motivation</option>
          <option value="wisdom">Wisdom</option>
          <option value="happiness">Happiness</option>
          <option value="success">Success</option>
        </select>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Generate Quote</Button>
      {result && (
        <ToolResponse>
          <blockquote className="text-xl italic text-center py-4 border-l-4 border-[#e94560] pl-4">{result}</blockquote>
          <Button onClick={() => copyResult(result)} className="mt-3 btn-primary text-sm py-2">
            <Copy size={14} /> Copy Quote
          </Button>
        </ToolResponse>
      )}
    </div>
  );
}

export function BusinessNameTool() {
  const [keywords, setKeywords] = useState('');
  const [industry, setIndustry] = useState('tech');
  const [result, setResult] = useState<string[] | null>(null);
  
  const generate = () => {
    const words = keywords.split(',').map(w => w.trim()).filter(w => w);
    const prefixes: Record<string, string[]> = {
      tech: ['Tech', 'Digital', 'Cyber', 'Data', 'Cloud', 'Smart', 'Nano', 'Quantum'],
      food: ['Fresh', 'Tasty', 'Gourmet', 'Savory', 'Sweet', 'Organic', 'Natural', 'Craft'],
      fashion: ['Style', 'Chic', 'Vogue', 'Trend', 'Mode', 'Glam', 'Classy', 'Elegant'],
      fitness: ['Fit', 'Strong', 'Active', 'Power', 'Flex', 'Core', 'Peak', 'Prime']
    };
    
    const suffixes = ['Hub', 'Lab', 'Studio', 'Works', 'Co', 'Pro', 'X', 'ify', 'ly', 'io'];
    const pre = prefixes[industry] || prefixes.tech;
    
    const names = [];
    for (let i = 0; i < 6; i++) {
      const prefix = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : pre[Math.floor(Math.random() * pre.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      names.push(prefix + suffix);
    }
    
    setResult(names);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
        <Input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g., green, eco, nature" className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Industry</label>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="tool-input">
          <option value="tech">Technology</option>
          <option value="food">Food & Beverage</option>
          <option value="fashion">Fashion</option>
          <option value="fitness">Fitness</option>
        </select>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Generate Names</Button>
      {result && (
        <div className="tool-response">
          <ul className="space-y-2">
            {result.map((name, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="font-medium">{name}</span>
                <Button onClick={() => copyResult(name)} variant="ghost" size="sm">
                  <Copy size={14} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Productivity Tools
export function TaskPrioritizerTool() {
  const [tasks, setTasks] = useState('');
  const [result, setResult] = useState<string | null>(null);
  
  const prioritize = () => {
    const taskList = tasks.split('\n').filter(t => t.trim());
    
    const resultText = `Task Prioritization:

You have ${taskList.length} tasks to prioritize.

Eisenhower Matrix:

DO FIRST (Urgent & Important):
${taskList[0] ? `• ${taskList[0]}` : '• [Your most critical task]'}

SCHEDULE (Important, Not Urgent):
${taskList[1] ? `• ${taskList[1]}` : ''}
${taskList[2] ? `• ${taskList[2]}` : ''}

DELEGATE (Urgent, Not Important):
${taskList[3] ? `• ${taskList[3]}` : ''}

ELIMINATE (Neither Urgent nor Important):
${taskList.slice(4).map(t => `• ${t}`).join('\n')}

Remember: Focus on one task at a time!`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Tasks (one per line)</label>
        <Textarea value={tasks} onChange={(e) => setTasks(e.target.value)} placeholder="Task 1&#10;Task 2&#10;Task 3" className="tool-input min-h-[120px]" />
      </div>
      <Button onClick={prioritize} className="w-full btn-primary">Prioritize Tasks</Button>
      {result && <ToolResponse exportData={result} exportFilename="task-priorities.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function TimeAnalyzerTool() {
  const [workHours, setWorkHours] = useState(8);
  const [sleepHours, setSleepHours] = useState(7);
  const [leisureHours, setLeisureHours] = useState(4);
  const [result, setResult] = useState<string | null>(null);
  
  const analyze = () => {
    const total = workHours + sleepHours + leisureHours;
    const other = 24 - total;
    
    const resultText = `Daily Time Breakdown:

Work: ${workHours}h (${((workHours/24)*100).toFixed(1)}%)
Sleep: ${sleepHours}h (${((sleepHours/24)*100).toFixed(1)}%)
Leisure: ${leisureHours}h (${((leisureHours/24)*100).toFixed(1)}%)
Other: ${other}h (${((other/24)*100).toFixed(1)}%)

${workHours > 10 ? '⚠️ Consider reducing work hours for better balance.' : sleepHours < 6 ? '⚠️ Try to get more sleep for better health.' : '✅ Good time distribution!'}

Tips:
• Track your time for a week
• Identify time wasters
• Batch similar tasks
• Use the 2-minute rule`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Work</label>
          <Input type="number" value={workHours} onChange={(e) => setWorkHours(parseInt(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sleep</label>
          <Input type="number" value={sleepHours} onChange={(e) => setSleepHours(parseInt(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Leisure</label>
          <Input type="number" value={leisureHours} onChange={(e) => setLeisureHours(parseInt(e.target.value))} className="tool-input" />
        </div>
      </div>
      <Button onClick={analyze} className="w-full btn-primary">Analyze Time</Button>
      {result && <ToolResponse exportData={result} exportFilename="time-analysis.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function PomodoroTimerTool() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  useEffect(() => {
    if (isActive && time > 0) {
      timerRef.current = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      setIsActive(false);
      toast.success(mode === 'work' ? 'Work session complete! Take a break.' : 'Break over! Ready to focus?');
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, time, mode]);
  
  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  
  const reset = () => {
    setIsActive(false);
    setTime(mode === 'work' ? 25 * 60 : 5 * 60);
  };
  
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => { setMode('work'); setTime(25*60); setIsActive(false); }} className={`px-4 py-2 rounded-lg ${mode === 'work' ? 'bg-[#e94560] text-white' : 'bg-gray-200'}`}>Work (25m)</button>
        <button onClick={() => { setMode('break'); setTime(5*60); setIsActive(false); }} className={`px-4 py-2 rounded-lg ${mode === 'break' ? 'bg-[#00d9a5] text-white' : 'bg-gray-200'}`}>Break (5m)</button>
      </div>
      
      <div className={`text-7xl font-bold font-mono ${mode === 'work' ? 'text-[#e94560]' : 'text-[#00d9a5]'}`}>
        {formatTime(time)}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button onClick={() => setIsActive(!isActive)} className={`btn-primary ${isActive ? 'bg-yellow-500' : ''}`}>
          {isActive ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
        </Button>
        <Button onClick={reset} variant="outline">
          <RotateCcw size={18} /> Reset
        </Button>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>💡 The Pomodoro Technique: 25 min work + 5 min break</p>
        <p>After 4 cycles, take a longer 15-30 min break</p>
      </div>
    </div>
  );
}

export function FocusBoosterTool() {
  const [result, setResult] = useState<string | null>(null);
  
  const tips = [
    '🔕 Turn off all notifications',
    '🎧 Use focus music or white noise',
    '📱 Put your phone in another room',
    '⏱️ Use a timer (try the Pomodoro Technique)',
    '📝 Write down distracting thoughts for later',
    '🪟 Work near natural light',
    '🧘 Take 3 deep breaths before starting',
    '🎯 Set ONE clear goal for this session'
  ];
  
  const generate = () => {
    const shuffled = tips.sort(() => 0.5 - Math.random()).slice(0, 5);
    setResult(shuffled.join('\n'));
  };
  
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Get personalized focus tips to boost your productivity</p>
      <Button onClick={generate} className="w-full btn-primary">Get Focus Tips</Button>
      {result && (
        <div className="tool-response">
          <h4 className="font-bold mb-3">Your Focus Boosters:</h4>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
}

// Utility Tools
export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  
  const generate = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setResult(password);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Password Length: {length}</label>
        <input type="range" min="8" max="32" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" />
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
          <span className="text-sm">Uppercase (A-Z)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
          <span className="text-sm">Numbers (0-9)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
          <span className="text-sm">Symbols (!@#$)</span>
        </label>
      </div>
      <Button onClick={generate} className="w-full btn-primary">Generate Password</Button>
      {result && (
        <div className="tool-response">
          <div className="flex items-center gap-3">
            <code className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded flex-1 font-mono text-lg">{result}</code>
            <Button onClick={() => copyResult(result)} size="sm">
              <Copy size={16} />
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">💡 Use a password manager to store this securely</p>
        </div>
      )}
    </div>
  );
}

export function TipCalculatorTool() {
  const [bill, setBill] = useState(100);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(2);
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    const resultText = `Tip Calculation:

Bill Amount: $${bill.toFixed(2)}
Tip (${tipPercent}%): $${tipAmount.toFixed(2)}
Total: $${total.toFixed(2)}

Split ${people} ways: $${perPerson.toFixed(2)} per person

Quick Tips:
• 15% = Standard service
• 18% = Good service
• 20%+ = Excellent service`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Bill Amount ($)</label>
        <Input type="number" step="0.01" value={bill} onChange={(e) => setBill(parseFloat(e.target.value))} className="tool-input" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Tip Percentage: {tipPercent}%</label>
        <input type="range" min="0" max="30" value={tipPercent} onChange={(e) => setTipPercent(parseInt(e.target.value))} className="w-full" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <button onClick={() => setTipPercent(15)} className="hover:text-[#e94560]">15%</button>
          <button onClick={() => setTipPercent(18)} className="hover:text-[#e94560]">18%</button>
          <button onClick={() => setTipPercent(20)} className="hover:text-[#e94560]">20%</button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Number of People</label>
        <Input type="number" value={people} onChange={(e) => setPeople(parseInt(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Tip</Button>
      {result && <ToolResponse exportData={result} exportFilename="tip-calculation.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState('1994-01-01');
  const [result, setResult] = useState<string | null>(null);
  
  const calculate = () => {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const resultText = `Age Calculation:

You are:
• ${years} years
• ${months} months  
• ${days} days old

In other units:
• ${totalDays.toLocaleString()} days
• ${totalHours.toLocaleString()} hours

Next birthday in ${daysUntilBirthday} days! 🎂`;
    
    setResult(resultText);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Birth Date</label>
        <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="tool-input" />
      </div>
      <Button onClick={calculate} className="w-full btn-primary">Calculate Age</Button>
      {result && <ToolResponse exportData={result} exportFilename="age-calculation.txt"><pre className="whitespace-pre-wrap text-sm">{result}</pre></ToolResponse>}
    </div>
  );
}

export function RandomNumberTool() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [result, setResult] = useState<number[] | null>(null);
  
  const generate = () => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResult(numbers);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Min</label>
          <Input type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value))} className="tool-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Max</label>
          <Input type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value))} className="tool-input" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">How many numbers?</label>
        <Input type="number" min="1" max="10" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="tool-input" />
      </div>
      <Button onClick={generate} className="w-full btn-primary">Generate Numbers</Button>
      {result && (
        <div className="tool-response">
          <div className="flex flex-wrap gap-3 justify-center">
            {result.map((num, i) => (
              <div key={i} className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center text-white text-xl font-bold">
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
