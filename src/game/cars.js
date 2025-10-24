// Car data configuration for RaceForge
// Each car has unique stats and references its 3D model

export const cars = [
  {
    id: 1,
    name: "Corvette Grand Sport '62",
    model: "/src/assets/cars/car1.glb",
    speed: 85,
    acceleration: 78,
    handling: 82,
    weight: 1100,
    description: "Classic American muscle with legendary racing heritage",
    year: 1962
  },
  {
    id: 2,
    name: "Shelby Cobra Daytona '65",
    model: "/src/assets/cars/car2.glb",
    speed: 92,
    acceleration: 85,
    handling: 88,
    weight: 1050,
    description: "Iconic Le Mans winner with aerodynamic excellence",
    year: 1965
  },
  {
    id: 3,
    name: "Porsche 917K '70",
    model: "/src/assets/cars/car3.glb",
    speed: 95,
    acceleration: 90,
    handling: 92,
    weight: 800,
    description: "Legendary endurance racer with unmatched performance",
    year: 1970
  },
  {
    id: 4,
    name: "BMW 3.0 CSL '75",
    model: "/src/assets/cars/car4.glb",
    speed: 80,
    acceleration: 75,
    handling: 85,
    weight: 1150,
    description: "The Batmobile - touring car racing icon",
    year: 1975
  },
  {
    id: 5,
    name: "Mercedes CLK LM '98",
    model: "/src/assets/cars/car5.glb",
    speed: 94,
    acceleration: 88,
    handling: 90,
    weight: 900,
    description: "GT1 monster with cutting-edge aerodynamics",
    year: 1998
  },
  {
    id: 6,
    name: "Audi R15 TDI '09",
    model: "/src/assets/cars/car6.glb",
    speed: 96,
    acceleration: 92,
    handling: 94,
    weight: 900,
    description: "Diesel-powered Le Mans dominator",
    year: 2009
  },
  {
    id: 7,
    name: "BMW Z4 GT3 '10",
    model: "/src/assets/cars/car7.glb",
    speed: 88,
    acceleration: 82,
    handling: 90,
    weight: 1200,
    description: "Modern GT3 racer with balanced performance",
    year: 2010
  },
  {
    id: 8,
    name: "Corvette C6.R '10",
    model: "/src/assets/cars/car8.glb",
    speed: 90,
    acceleration: 85,
    handling: 87,
    weight: 1100,
    description: "American GT racing powerhouse",
    year: 2010
  },
  {
    id: 9,
    name: "BMW M2 Competition '18",
    model: "/src/assets/cars/car9.glb",
    speed: 82,
    acceleration: 80,
    handling: 88,
    weight: 1550,
    description: "Compact performance with razor-sharp handling",
    year: 2018
  },
  {
    id: 10,
    name: "BMW M4 GT4 '18",
    model: "/src/assets/cars/car10.glb",
    speed: 86,
    acceleration: 83,
    handling: 91,
    weight: 1400,
    description: "Modern GT4 racer built for competition",
    year: 2018
  }
];

// Helper function to get car by ID
export const getCarById = (id) => {
  return cars.find(car => car.id === id);
};

// Helper function to get all cars
export const getAllCars = () => {
  return cars;
};
