export interface QuestionnaireData {
  // Paso 1: Datos Personales
  name: string;
  age: number;
  biologicalSex: "male" | "female";
  height: number;
  currentWeight: number;
  goalWeight?: number;
  country: string;

  // Paso 2: Métricas Corporales
  bodyFatPercentage?: number;
  waistMeasurement?: number;
  hipMeasurement?: number;
  armMeasurement?: number;
  chestMeasurement?: number;
  bodyType: "ectomorph" | "mesomorph" | "endomorph" | "";
  weightOneYearAgo?: number;
  weightFiveYearsAgo?: number;
  consistentWeighing: boolean;

  // Paso 3: Salud y Condiciones Médicas
  medicalConditions: string[];
  foodAllergies: string[];
  intolerances: string[];
  currentMedications: string;
  digestiveIssues: string[];
  physicalLimitations: string;
  recentSurgeries: string;

  // Paso 4: Objetivo Principal
  mainGoal: "lose_fat" | "gain_muscle" | "recomposition" | "improve_health" | "athletic_performance" | "maintain_weight" | "";
  desiredTimeline: string;
  specificEvent: string;

  // Paso 5: Estilo de Vida
  workType: "sedentary" | "moderate" | "physical" | "";
  workSchedule: "morning" | "afternoon" | "night" | "rotating" | "";
  wakeUpTime: string;
  bedTime: string;
  averageSleepHours: number;
  sleepQuality: "good" | "regular" | "poor" | "";
  stressLevel: number;
  householdSize: number;
  coffeeTeaCups: number;
  smokingStatus: "no" | "occasional" | "daily" | "";
  dailyWaterLiters: number;
  mealTimes: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };

  // Paso 6: Preferencias Alimenticias
  dietType: "omnivore" | "vegetarian" | "vegan" | "keto" | "mediterranean" | "no_preference" | "";
  lovedFoods: string[];
  hatedFoods: string[];
  cookingSkill: number;
  cookingTimeMinutes: number;
  foodBudget: "low" | "medium" | "high" | "";
  mealsPerDay: number;
  eatingOut: "never" | "1_2_weekly" | "almost_daily" | "";
  alcoholConsumption: "never" | "occasional" | "frequent" | "";
  snacking: "never" | "sometimes" | "always" | "";
  snackTypes: string;
  currentSupplements: string;
  specializedStoreAccess: boolean;

  // Paso 7: Contexto Emocional
  stressEating: "never" | "sometimes" | "frequently" | "";
  boredomEating: "never" | "sometimes" | "frequently" | "";
  foodGuilt: boolean;
  bingeEpisodes: boolean;
  eatingDisorderDiagnosis: boolean;
  motivationLevel: number;
  previousDietAttempts: string;
  biggestObstacle: string;
  supportSystem: boolean;

  // Paso 8: Ejercicio Actual
  currentlyExercising: boolean;
  currentExerciseType: string;
  weeklyFrequency: number;
  sessionDuration: number;
  exerciseExperience: "beginner" | "intermediate" | "advanced" | "";
  trainingDuration: string;

  // Paso 9: Preferencias de Ejercicio
  trainingLocation: "home" | "gym" | "outdoor" | "mixed" | "";
  homeEquipment: string[];
  exerciseTimeMinutes: number;
  availableDaysPerWeek: number;
  preferredTrainingTime: "morning" | "afternoon" | "night" | "";
  enjoyedExercises: string;
  dislikedExercises: string;
  exerciseInterest: string[];

  // Paso 10: Extras
  previousDiets: string;
  planStrictness: "flexible" | "moderate" | "strict" | "";
  varietyPreference: "variety" | "repeat" | "";
  needsMealPrep: boolean;
  additionalNotes: string;

  // Paso 11: Prioridades
  priorities: string[];
}

export interface NutritionPlan {
  profileSummary: string;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  weeklyMealPlan: DayMealPlan[];
  shoppingList: ShoppingCategory[];
  exercisePlan: DayExercisePlan[];
  tips: string[];
  substitutions: string[];
}

export interface DayMealPlan {
  day: string;
  meals: Meal[];
}

export interface Meal {
  name: string;
  time: string;
  foods: FoodItem[];
  totalCalories: number;
}

export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  recipe?: string;
}

export interface ShoppingCategory {
  category: string;
  items: { name: string; quantity: string }[];
}

export interface DayExercisePlan {
  day: string;
  focus: string;
  exercises: Exercise[];
  duration: number;
  notes?: string;
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rest?: string;
  notes?: string;
}

export const INITIAL_QUESTIONNAIRE_DATA: QuestionnaireData = {
  name: "",
  age: 0,
  biologicalSex: "male",
  height: 0,
  currentWeight: 0,
  goalWeight: undefined,
  country: "",
  bodyFatPercentage: undefined,
  waistMeasurement: undefined,
  hipMeasurement: undefined,
  armMeasurement: undefined,
  chestMeasurement: undefined,
  bodyType: "",
  weightOneYearAgo: undefined,
  weightFiveYearsAgo: undefined,
  consistentWeighing: false,
  medicalConditions: [],
  foodAllergies: [],
  intolerances: [],
  currentMedications: "",
  digestiveIssues: [],
  physicalLimitations: "",
  recentSurgeries: "",
  mainGoal: "",
  desiredTimeline: "",
  specificEvent: "",
  workType: "",
  workSchedule: "",
  wakeUpTime: "07:00",
  bedTime: "23:00",
  averageSleepHours: 7,
  sleepQuality: "",
  stressLevel: 3,
  householdSize: 1,
  coffeeTeaCups: 0,
  smokingStatus: "",
  dailyWaterLiters: 2,
  mealTimes: { breakfast: "08:00", lunch: "13:00", dinner: "20:00" },
  dietType: "",
  lovedFoods: [],
  hatedFoods: [],
  cookingSkill: 3,
  cookingTimeMinutes: 30,
  foodBudget: "",
  mealsPerDay: 3,
  eatingOut: "",
  alcoholConsumption: "",
  snacking: "",
  snackTypes: "",
  currentSupplements: "",
  specializedStoreAccess: false,
  stressEating: "",
  boredomEating: "",
  foodGuilt: false,
  bingeEpisodes: false,
  eatingDisorderDiagnosis: false,
  motivationLevel: 5,
  previousDietAttempts: "",
  biggestObstacle: "",
  supportSystem: false,
  currentlyExercising: false,
  currentExerciseType: "",
  weeklyFrequency: 0,
  sessionDuration: 0,
  exerciseExperience: "",
  trainingDuration: "",
  trainingLocation: "",
  homeEquipment: [],
  exerciseTimeMinutes: 30,
  availableDaysPerWeek: 3,
  preferredTrainingTime: "",
  enjoyedExercises: "",
  dislikedExercises: "",
  exerciseInterest: [],
  previousDiets: "",
  planStrictness: "",
  varietyPreference: "",
  needsMealPrep: false,
  additionalNotes: "",
  priorities: [],
};
