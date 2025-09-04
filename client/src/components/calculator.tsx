import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { getDogAgeResult, calculateAgeFromBirthday, type DogSize } from "@/lib/dog-age-calculator";

type InputMethod = 'manual' | 'sliders' | 'birthday';

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
    if (inputMethod === 'sliders') {
      setAge(years + months / 12);
    }
  }, [years, months, inputMethod]);

  // Calculate result
  const result = getDogAgeResult(age, size);

  const handleBirthdayChange = (value: string) => {
    setBirthday(value);
    if (value) {
      const calculatedAge = calculateAgeFromBirthday(value);
      setAge(calculatedAge);
    }
  };

  const sizeOptions = [
    {
      id: 'small',
      title: 'Small Dogs',
      subtitle: 'Under 20 lbs',
      breeds: 'Chihuahua, Pomeranian, Yorkshire Terrier',
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    },
    {
      id: 'medium',
      title: 'Medium Dogs',
      subtitle: '20-50 lbs',
      breeds: 'Beagle, Border Collie, Bulldog',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-700'
    },
    {
      id: 'large',
      title: 'Large Dogs',
      subtitle: 'Over 50 lbs',
      breeds: 'German Shepherd, Golden Retriever, Great Dane',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-700'
    }
  ];

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
                    <span className="text-white text-sm">🐕</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">How would you like to input your dog's age?</h3>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={() => setInputMethod('manual')}
                    className={`flex-1 rounded-2xl py-6 px-4 text-center transition-all ${
                      inputMethod === 'manual' 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    data-testid="button-method-manual"
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="font-semibold">Manual Age</div>
                      <div className="text-sm opacity-75">Use sliders</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setInputMethod('birthday')}
                    className={`flex-1 rounded-2xl py-6 px-4 text-center transition-all ${
                      inputMethod === 'birthday' 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    data-testid="button-method-birthday"
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-2">📅</div>
                      <div className="font-semibold">Birthday</div>
                      <div className="text-sm opacity-75">Select date</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              {/* Age Input Section */}
              <div className="space-y-6">
                {/* Manual/Slider Input */}
                {inputMethod === 'manual' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">📅</span>
                      <Label className="text-lg font-semibold text-gray-800">
                        Age: <span data-testid="text-years">{years}</span> years
                      </Label>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="px-4">
                        <Slider
                          value={[years]}
                          onValueChange={(value) => {
                            setYears(value[0]);
                            setAge(value[0] + months / 12);
                          }}
                          max={20}
                          step={1}
                          className="w-full"
                          data-testid="slider-years"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>0 years</span>
                          <span>20 years</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="px-4">
                        <Slider
                          value={[months]}
                          onValueChange={(value) => {
                            setMonths(value[0]);
                            setAge(years + value[0] / 12);
                          }}
                          max={11}
                          step={1}
                          className="w-full"
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
                    <Label htmlFor="birthday-date" className="text-lg font-semibold text-gray-800">
                      Select date
                    </Label>
                    <Input
                      id="birthday-date"
                      type="date"
                      value={birthday}
                      onChange={(e) => handleBirthdayChange(e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 bg-gray-50"
                      placeholder="mm/dd/yyyy"
                      data-testid="input-birthday"
                    />
                  </div>
                )}
              </div>
              
              {/* Dog Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🐕</span>
                  <h3 className="text-lg font-semibold text-gray-800">Dog Size</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {sizeOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`rounded-2xl p-4 cursor-pointer transition-all text-center ${
                        size === option.id
                          ? option.bgColor + ' ' + option.textColor + ' shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSize(option.id as DogSize)}
                      data-testid={`button-size-${option.id}`}
                    >
                      <div className="text-2xl mb-2">🐕</div>
                      <div className="font-semibold text-sm">{option.title}</div>
                      <div className="text-xs opacity-75 mt-1">{option.subtitle}</div>
                      <div className="text-xs opacity-60 mt-1">{option.breeds}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Calculate Button */}
              <Button 
                className="w-full py-4 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-2xl transition-all shadow-lg"
                data-testid="button-calculate"
              >
                <span className="mr-2">📊</span>
                Calculate Human Age
              </Button>
            </div>
            
            {/* Right Column - Results */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-100">
              <div className="text-8xl mb-4">🐶</div>
              <div className="text-5xl font-bold text-orange-500 mb-2" data-testid="text-human-age">
                {result.humanAge} years old
              </div>
              <div className="text-xl font-semibold text-green-600 mb-6" data-testid="text-life-stage">
                Life Stage: {result.lifeStage}
              </div>
              <div className="text-gray-600 mb-8 text-lg" data-testid="text-age-description">
                {result.description}
              </div>
              
              <Input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Enter your pet's name..."
                className="mb-6 text-center border-2 border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:ring-0"
                data-testid="input-pet-name"
              />
              
              <div className="text-gray-600 mb-6">
                <span className="mr-2">🔗</span>
                Share this amazing result:
              </div>
              
              <div className="flex gap-3 justify-center mb-6">
                <Button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm">
                  <span className="mr-1">🐦</span>
                  Twitter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                  <span className="mr-1">📘</span>
                  Facebook
                </Button>
                <Button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm">
                  <span className="mr-1">🔗</span>
                  Copy Link
                </Button>
              </div>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold">
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