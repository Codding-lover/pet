import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { getDogAgeResult, calculateAgeFromBirthday, type DogSize } from "@/lib/dog-age-calculator";

type InputMethod = 'manual' | 'birthday';

export default function Calculator() {
  const [age, setAge] = useState(1);
  const [size, setSize] = useState<DogSize>('small');
  const [inputMethod, setInputMethod] = useState<InputMethod>('manual');
  const [years, setYears] = useState(1);
  const [months, setMonths] = useState(0);
  const [birthday, setBirthday] = useState('');
  const [petName, setPetName] = useState('');

  // Update age when sliders change
  useEffect(() => {
    setAge(years + months / 12);
  }, [years, months]);

  // Calculate result
  const result = getDogAgeResult(age, size);

  const handleBirthdayChange = (value: string) => {
    setBirthday(value);
    if (value) {
      const calculatedAge = calculateAgeFromBirthday(value);
      setAge(calculatedAge);
    }
  };

  return (
    <section id="calculator" className="py-16 px-4 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">🐕 Dog Age Calculator</h2>
          <p className="text-xl text-gray-600">
            Use our advanced calculator to discover your dog's age in human years
          </p>
        </div>
        
        <Card className="bg-white rounded-3xl p-8 shadow-2xl border-0 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Input Controls */}
            <div className="space-y-8">
              {/* Input Method Selection */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xs">🐕</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">How would you like to input your dog's age?</h3>
                </div>
                
                <div className="flex gap-4">
                  {/* Manual Age Button */}
                  <div
                    onClick={() => setInputMethod('manual')}
                    className={`flex-1 rounded-2xl py-6 px-6 cursor-pointer transition-all ${
                      inputMethod === 'manual' 
                        ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                    data-testid="button-method-manual"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="font-bold text-lg">Manual Age</div>
                      <div className="text-sm opacity-80">Use sliders</div>
                    </div>
                  </div>
                  
                  {/* Birthday Button */}
                  <div
                    onClick={() => setInputMethod('birthday')}
                    className={`flex-1 rounded-2xl py-6 px-6 cursor-pointer transition-all ${
                      inputMethod === 'birthday' 
                        ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                    data-testid="button-method-birthday"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">📅</div>
                      <div className="font-bold text-lg">Birthday</div>
                      <div className="text-sm opacity-80">Select date</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Age Input Section */}
              {inputMethod === 'manual' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 text-xl">📅</span>
                    <Label className="text-lg font-semibold text-gray-700">
                      Age: <span data-testid="text-years">{years}</span> years
                    </Label>
                  </div>
                  
                  {/* Years Slider */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Slider
                        value={[years]}
                        onValueChange={(value) => setYears(value[0])}
                        max={20}
                        step={1}
                        className="w-full h-3"
                        data-testid="slider-years"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>0 years</span>
                        <span>20 years</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Months Slider */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Slider
                        value={[months]}
                        onValueChange={(value) => setMonths(value[0])}
                        max={11}
                        step={1}
                        className="w-full h-3"
                        data-testid="slider-months"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>0 months</span>
                        <span>11 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Birthday Input */}
              {inputMethod === 'birthday' && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700">
                    Select date
                  </Label>
                  <Input
                    type="date"
                    value={birthday}
                    onChange={(e) => handleBirthdayChange(e.target.value)}
                    className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 bg-gray-50"
                    data-testid="input-birthday"
                  />
                </div>
              )}
              
              {/* Dog Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 text-xl">🐕</span>
                  <h3 className="text-lg font-semibold text-gray-700">Dog Size</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {/* Small Dogs */}
                  <div
                    onClick={() => setSize('small')}
                    className={`rounded-2xl p-4 cursor-pointer transition-all text-center ${
                      size === 'small'
                        ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                    data-testid="button-size-small"
                  >
                    <div className="text-2xl mb-2">🐕</div>
                    <div className="font-bold text-sm">Small Dogs</div>
                    <div className="text-xs opacity-75 mt-1">Under 20 lbs</div>
                    <div className="text-xs opacity-60 mt-1">Chihuahua, Pomeranian, Yorkshire Terrier</div>
                  </div>
                  
                  {/* Medium Dogs */}
                  <div
                    onClick={() => setSize('medium')}
                    className={`rounded-2xl p-4 cursor-pointer transition-all text-center ${
                      size === 'medium'
                        ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                    data-testid="button-size-medium"
                  >
                    <div className="text-2xl mb-2">🐕</div>
                    <div className="font-bold text-sm">Medium Dogs</div>
                    <div className="text-xs opacity-75 mt-1">20-50 lbs</div>
                    <div className="text-xs opacity-60 mt-1">Beagle, Border Collie, Bulldog</div>
                  </div>
                  
                  {/* Large Dogs */}
                  <div
                    onClick={() => setSize('large')}
                    className={`rounded-2xl p-4 cursor-pointer transition-all text-center ${
                      size === 'large'
                        ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                    data-testid="button-size-large"
                  >
                    <div className="text-2xl mb-2">🐕</div>
                    <div className="font-bold text-sm">Large Dogs</div>
                    <div className="text-xs opacity-75 mt-1">Over 50 lbs</div>
                    <div className="text-xs opacity-60 mt-1">German Shepherd, Golden Retriever, Great Dane</div>
                  </div>
                </div>
              </div>
              
              {/* Calculate Button */}
              <Button 
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl transition-all shadow-lg border-0"
                data-testid="button-calculate"
              >
                <span className="mr-2">📊</span>
                Calculate Human Age
              </Button>
            </div>
            
            {/* Right Column - Results */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center">
              {/* Green Dog Icon */}
              <div className="text-8xl mb-6 text-green-500">🐶</div>
              
              {/* Age Result */}
              <div className="text-5xl font-bold text-orange-500 mb-4" data-testid="text-human-age">
                {result.humanAge} years old
              </div>
              
              {/* Life Stage */}
              <div className="text-xl font-bold text-green-500 mb-6" data-testid="text-life-stage">
                Life Stage: {result.lifeStage}
              </div>
              
              {/* Description */}
              <div className="text-gray-600 mb-8 text-base" data-testid="text-age-description">
                {result.description}
              </div>
              
              {/* Pet Name Input */}
              <Input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Enter your pet's name..."
                className="mb-8 text-center border-2 border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:ring-0 text-gray-500"
                data-testid="input-pet-name"
              />
              
              {/* Share Text */}
              <div className="text-gray-600 mb-6 flex items-center justify-center gap-2">
                <span>🔗</span>
                <span>Share this amazing result:</span>
              </div>
              
              {/* Social Buttons */}
              <div className="flex gap-3 justify-center mb-6">
                <Button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-semibold">
                  <span className="mr-2">🐦</span>
                  Twitter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold">
                  <span className="mr-2">📘</span>
                  Facebook
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-sm font-semibold">
                  <span className="mr-2">🔗</span>
                  Copy Link
                </Button>
              </div>
              
              {/* Download Button */}
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base">
                <span className="mr-2">⬇️</span>
                Download
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}