const eventDictionary: { [key: string]: { label: string; icon: string } } = {
  MOMENT_BATTLE_FOUGHT: {
    label: "Batalla librada contra adversarios.",
    icon: "MOMENT_BATTLE_FOUGHT.png",
  },
  MOMENT_WONDER_BUILT: {
    label: "¡Maravilla del Mundo completada!",
    icon: "MOMENT_WONDER_BUILT.png",
  },
  MOMENT_RELIGION_FOUNDED: {
    label: "Una nueva Fe se ha extendido por el mundo.",
    icon: "MOMENT_RELIGION_FOUNDED.png",
  },
  MOMENT_CITY_CAPTURED: {
    label: "Una ciudad rival ha caído ante nuestro glorioso ejército.",
    icon: "MOMENT_CITY_CAPTURED.png",
  },
  MOMENT_GREAT_PERSON_RECRUITED: {
    label: "Un Gran Personaje se ha unido a nuestra causa.",
    icon: "MOMENT_GREAT_PERSON_RECRUITED.png",
  },
};

// Icono por defecto
const DEFAULT_ICON = "MOMENT_GENERIC.png";

export const translateEvent = (eventType: string) => {
  const translation = eventDictionary[eventType];
  
  if (translation) {
    return translation;
  }

  return {
    label: eventType.replace("MOMENT_", "").replace(/_/g, " ").toLowerCase(),
    icon: DEFAULT_ICON,
  };
};

export const getEraColor = (era: string): string => {
  const eraColors: { [key: string]: string } = {
    ERA_ANCIENT: "#8b5e3c", // Sepia/Marrón
    ERA_CLASSICAL: "#4a90e2", // Azul
    ERA_MEDIEVAL: "#50e3c2", // Turquesa
    ERA_RENAISSANCE: "#f5a623", // Naranja
    ERA_INDUSTRIAL: "#9b9b9b", // Gris
    ERA_MODERN: "#b8e986", // Verde lima
    ERA_ATOMIC: "#d0021b", // Rojo
    ERA_INFORMATION: "#bd10e0", // Morado
    ERA_FUTURE: "#417505", // Verde oscuro
  };
  return eraColors[era] || "#fff";
};