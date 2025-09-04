import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { getDogAgeResult, calculateAgeFromBirthday, type DogSize } from "@/lib/dog-age-calculator";

type InputMethod = 'manual' | 'sliders' | 'birthday';

export default function Calculator() {
  const [age, setAge] = useState(3);
  const [size, setSize] = useState<DogSize>('medium');
  const [inputMethod, setInputMethod] = useState<InputMethod>('birthday');
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [birthday, setBirthday] = useState('');

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
      breeds: 'Chihuahua, Pomeranian, Yorkshire Terrier'
    },
    {
      id: 'medium',
      title: 'Medium Dogs',
      subtitle: '20-50 lbs',
      breeds: 'Beagle, Border Collie, Bulldog'
    },
    {
      id: 'large',
      title: 'Large Dogs',
      subtitle: 'Over 50 lbs',
      breeds: 'German Shepherd, Golden Retriever, Great Dane'
    }
  ];

  return (
    <section id="calculator" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">🐕 Dog Age Calculator</h2>
          <p className="text-xl text-gray-600">
            Use our advanced calculator to discover your dog's age in human years
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Input Controls */}
          <div className="lg:col-span-3">
            <Card className="bg-white rounded-2xl p-8 shadow-lg border-0">
              {/* Input Method Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">How would you like to input your dog's age?</h3>
                <div className="flex gap-3">
                  <Button
                    variant={inputMethod === 'manual' ? 'default' : 'outline'}
                    onClick={() => setInputMethod('manual')}
                    className={`rounded-full px-6 py-3 font-medium transition-all ${
                      inputMethod === 'manual' 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0'
                    }`}
                    data-testid="button-method-manual"
                  >
                    Manual Age
                  </Button>
                  <Button
                    variant={inputMethod === 'sliders' ? 'default' : 'outline'}
                    onClick={() => setInputMethod('sliders')}
                    className={`rounded-full px-6 py-3 font-medium transition-all ${
                      inputMethod === 'sliders' 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0'
                    }`}
                    data-testid="button-method-sliders"
                  >
                    Use sliders
                  </Button>
                  <Button
                    variant={inputMethod === 'birthday' ? 'default' : 'outline'}
                    onClick={() => setInputMethod('birthday')}
                    className={`rounded-full px-6 py-3 font-medium transition-all ${
                      inputMethod === 'birthday' 
                        ? 'bg-orange-500 text-white hover:bg-orange-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0'
                    }`}
                    data-testid="button-method-birthday"
                  >
                    Birthday
                  </Button>
                </div>
              </div>
              
              {/* Age Input Section */}
              <div className="space-y-8">
                {/* Manual Input */}
                {inputMethod === 'manual' && (
                  <div className="space-y-4">
                    <Label htmlFor="manual-age" className="text-lg font-semibold text-gray-900">
                      Age: <span data-testid="text-manual-age">{age}</span> years
                    </Label>
                    <Input
                      id="manual-age"
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={age}
                      onChange={(e) => setAge(parseFloat(e.target.value) || 0)}
                      className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0"
                      data-testid="input-manual-age"
                    />
                  </div>
                )}
                
                {/* Slider Input */}
                {inputMethod === 'sliders' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-gray-900">
                        Age: <span data-testid="text-years">{years}</span> years
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={[years]}
                          onValueChange={(value) => setYears(value[0])}
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
                      <Label className="text-lg font-semibold text-gray-900">
                        Months: <span data-testid="text-months">{months}</span>
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={[months]}
                          onValueChange={(value) => setMonths(value[0])}
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
                    <Label htmlFor="birthday-date" className="text-lg font-semibold text-gray-900">
                      Select date
                    </Label>
                    <Input
                      id="birthday-date"
                      type="date"
                      value={birthday}
                      onChange={(e) => handleBirthdayChange(e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0"
                      placeholder="mm/dd/yyyy"
                      data-testid="input-birthday"
                    />
                  </div>
                )}
                
                {/* Dog Size Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Dog Size</h3>
                  <div className="space-y-3">
                    {sizeOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                          size === option.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => setSize(option.id as DogSize)}
                        data-testid={`button-size-${option.id}`}
                      >
                        <div className="font-semibold text-gray-900">{option.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.subtitle}</div>
                        <div className="text-sm text-gray-500 mt-1">{option.breeds}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-2xl p-8 shadow-lg border-0 text-center sticky top-8">
              <div className="text-6xl mb-6">🐶</div>
              <div className="text-4xl font-bold text-orange-500 mb-2" data-testid="text-human-age">
                {result.humanAge} years old
              </div>
              <div className="text-gray-600 mb-6 text-lg" data-testid="text-age-description">
                {result.description}
              </div>
              <div className="text-xl font-semibold text-green-600 mb-8" data-testid="text-life-stage">
                Life Stage: {result.lifeStage}
              </div>
              <Button 
                className="w-full py-4 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all mb-4"
                data-testid="button-calculate"
              >
                Calculate Human Age
              </Button>
              <div className="text-sm text-gray-500">
                Set your dog's age and size to see the magic!
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}