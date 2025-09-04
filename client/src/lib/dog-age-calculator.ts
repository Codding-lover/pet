export type DogSize = 'small' | 'medium' | 'large';

export interface DogAgeResult {
  humanAge: number;
  description: string;
  lifeStage: string;
}

export function calculateHumanAge(dogAge: number, size: DogSize): number {
  if (dogAge <= 0) return 0;
  
  if (size === 'small') {
    if (dogAge <= 2) {
      return dogAge * 12.5;
    } else {
      return 25 + (dogAge - 2) * 4;
    }
  } else if (size === 'medium') {
    if (dogAge <= 2) {
      return dogAge * 12;
    } else {
      return 24 + (dogAge - 2) * 4.5;
    }
  } else { // large
    if (dogAge <= 2) {
      return dogAge * 11.25;
    } else {
      return 22.5 + (dogAge - 2) * 6.5;
    }
  }
}

export function getAgeDescription(humanAge: number): string {
  if (humanAge < 1) return "as a newborn baby";
  if (humanAge < 10) return "as a baby human";
  if (humanAge < 20) return "as a teenager";
  if (humanAge < 40) return "as a young adult";
  if (humanAge < 65) return "as a middle-aged adult";
  return "as a senior adult";
}

export function getLifeStage(dogAge: number): string {
  if (dogAge < 0.5) return "Newborn";
  if (dogAge < 1) return "Puppy";
  if (dogAge < 3) return "Young Adult";
  if (dogAge < 8) return "Adult";
  return "Senior";
}

export function getDogAgeResult(dogAge: number, size: DogSize): DogAgeResult {
  const humanAge = Math.round(calculateHumanAge(dogAge, size));
  const description = getAgeDescription(humanAge);
  const lifeStage = getLifeStage(dogAge);
  
  return {
    humanAge,
    description,
    lifeStage
  };
}

export function calculateAgeFromBirthday(birthday: string): number {
  const today = new Date();
  const birthDate = new Date(birthday);
  const ageInMilliseconds = today.getTime() - birthDate.getTime();
  const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);
  return Math.max(0, ageInYears);
}
