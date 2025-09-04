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
  const [inputMethod, setInputMethod] = useState<InputMethod>('manual');
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
    <section id="calculator" className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">🐕 Dog Age Calculator</h2>
          <p className="text-xl text-muted-foreground">
            Use our advanced calculator with Apple-style controls to discover your dog's age in human years
          </p>
        </div>
        
        <Card className="bg-white rounded-2xl p-8 shadow-lg border border-border">
          {/* Input Method Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">How would you like to input your dog's age?</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={inputMethod === 'manual' ? 'default' : 'outline'}
                onClick={() => setInputMethod('manual')}
                data-testid="button-method-manual"
              >
                Manual Age
              </Button>
              <Button
                variant={inputMethod === 'sliders' ? 'default' : 'outline'}
                onClick={() => setInputMethod('sliders')}
                data-testid="button-method-sliders"
              >
                Use sliders
              </Button>
              <Button
                variant={inputMethod === 'birthday' ? 'default' : 'outline'}
                onClick={() => setInputMethod('birthday')}
                data-testid="button-method-birthday"
              >
                Birthday
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Age Input Section */}
            <div className="space-y-6">
              {/* Manual Input */}
              {inputMethod === 'manual' && (
                <div className="space-y-3">
                  <Label htmlFor="manual-age" className="text-lg font-semibold">
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
                    className="text-lg p-4"
                    data-testid="input-manual-age"
                  />
                </div>
              )}
              
              {/* Slider Input */}
              {inputMethod === 'sliders' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">
                      Years: <span data-testid="text-years">{years}</span>
                    </Label>
                    <Slider
                      value={[years]}
                      onValueChange={(value) => setYears(value[0])}
                      max={20}
                      step={1}
                      className="w-full"
                      data-testid="slider-years"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0 years</span>
                      <span>20 years</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">
                      Months: <span data-testid="text-months">{months}</span>
                    </Label>
                    <Slider
                      value={[months]}
                      onValueChange={(value) => setMonths(value[0])}
                      max={11}
                      step={1}
                      className="w-full"
                      data-testid="slider-months"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0 months</span>
                      <span>11 months</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Birthday Input */}
              {inputMethod === 'birthday' && (
                <div className="space-y-3">
                  <Label htmlFor="birthday-date" className="text-lg font-semibold">
                    Select date
                  </Label>
                  <Input
                    id="birthday-date"
                    type="date"
                    value={birthday}
                    onChange={(e) => handleBirthdayChange(e.target.value)}
                    className="text-lg p-4"
                    data-testid="input-birthday"
                  />
                </div>
              )}
              
              {/* Dog Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dog Size</h3>
                <div className="space-y-3">
                  {sizeOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        size === option.id
                          ? 'border-2 border-primary bg-accent/30'
                          : 'border border-border hover:border-primary hover:bg-accent/50'
                      }`}
                      onClick={() => setSize(option.id as DogSize)}
                      data-testid={`button-size-${option.id}`}
                    >
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-sm text-muted-foreground">{option.subtitle}</div>
                      <div className="text-sm text-muted-foreground">{option.breeds}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="bg-accent/30 rounded-xl p-6 text-center">
              <div className="text-6xl mb-4">🐕</div>
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-human-age">
                {result.humanAge} years old
              </div>
              <div className="text-muted-foreground mb-6" data-testid="text-age-description">
                {result.description}
              </div>
              <div className="text-lg font-semibold text-foreground mb-4" data-testid="text-life-stage">
                Life Stage: {result.lifeStage}
              </div>
              <Button 
                className="w-full py-4 text-lg font-semibold gradient-primary hover:opacity-90 transition-all"
                data-testid="button-calculate"
              >
                Calculate Human Age
              </Button>
              <div className="text-sm text-muted-foreground mt-4">
                Set your dog's age and size to see the magic!
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
