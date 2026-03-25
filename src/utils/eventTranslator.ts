import type { Moment } from "../types/civ";

export const eventDictionary: Record<string, { label: string; icon: string }> = {
  // --- FUNDACIÓN Y EXPLORACIÓN ---
  MOMENT_CITY_BUILT_ON_DESERT: { label: "Ciudad fundada en el implacable desierto.", icon: "MOMENT_CITY_BUILT_ON_DESERT.webp" },
  MOMENT_CITY_BUILT_ON_TUNDRA: { label: "Ciudad fundada en la gélida tundra.", icon: "MOMENT_CITY_BUILT_ON_TUNDRA.webp" },
  MOMENT_CITY_BUILT_NEW_CONTINENT: { label: "Primera ciudad en un nuevo continente.", icon: "MOMENT_CITY_BUILT_NEW_CONTINENT.webp" },
  MOMENT_GOODY_HUT_TRIGGERED: { label: "Los aldeanos de una tribu nos han entregado regalos.", icon: "MOMENT_GOODY_HUT_TRIGGERED.webp" },
  MOMENT_FIND_NATURAL_WONDER_FIRST_IN_WORLD: { label: "¡Primeros en el mundo en descubrir esta Maravilla Natural!", icon: "MOMENT_FIND_NATURAL_WONDER_FIRST_IN_WORLD.webp" },
  MOMENT_FIND_NATURAL_WONDER: { label: "Hemos descubierto una Maravilla Natural.", icon: "MOMENT_FIND_NATURAL_WONDER.webp" },
  MOMENT_WORLD_CIRCUMNAVIGATED_FIRST_IN_WORLD: { label: "¡Nuestra civilización fue la primera en dar la vuelta al mundo!", icon: "MOMENT_WORLD_CIRCUMNAVIGATED.webp" }, // Ojo: a veces comparten el mismo icono
  
  // --- COMBATE Y GUERRA ---
  MOMENT_BARBARIAN_CAMP_DESTROYED: { label: "Campamento bárbaro dispersado.", icon: "MOMENT_BARBARIAN_CAMP_DESTROYED.webp" },
  MOMENT_BARBARIAN_CAMP_DESTROYED_NEAR_YOUR_CITY: { label: "Amenaza bárbara eliminada cerca de nuestra ciudad.", icon: "MOMENT_BARBARIAN_CAMP_DESTROYED.webp" },
  MOMENT_CITY_TRANSFERRED_FOREIGN_CAPITAL: { label: "¡Hemos capturado la capital de otra civilización!", icon: "MOMENT_CITY_TRANSFERRED_FOREIGN_CAPITAL.webp" },
  MOMENT_CITY_TRANSFERRED_PLAYER_DEFEATED: { label: "Una civilización entera ha caído ante nosotros.", icon: "MOMENT_CITY_TRANSFERRED_PLAYER_DEFEATED.webp" },
  MOMENT_UNIT_KILLED_UNDERDOG_PROMOTIONS: { label: "Nuestra unidad veterana venció a un enemigo más fuerte.", icon: "MOMENT_UNIT_KILLED_UNDERDOG_PROMOTIONS.webp" },
  MOMENT_WAR_DECLARED_USING_CASUS_BELLI: { label: "Guerra declarada de forma justificada (Casus Belli).", icon: "MOMENT_WAR_DECLARED_USING_CASUS_BELLI.webp" },

  // --- RELIGIÓN Y CULTURA ---
  MOMENT_PANTHEON_FOUNDED_FIRST_IN_WORLD: { label: "¡Primer Panteón fundado en el mundo!", icon: "MOMENT_PANTHEON_FOUNDED.webp" },
  MOMENT_RELIGION_FOUNDED: { label: "Un Gran Profeta ha fundado nuestra Religión.", icon: "MOMENT_RELIGION_FOUNDED.webp" },
  MOMENT_INQUISITION_LAUNCHED: { label: "Ha comenzado la Inquisición de nuestra religión.", icon: "MOMENT_INQUISITION_LAUNCHED.webp" },

  // --- DESARROLLO Y CIENCIA ---
  MOMENT_BUILDING_CONSTRUCTED_GAME_ERA_WONDER: { label: "¡Maravilla del Mundo completada!", icon: "MOMENT_BUILDING_CONSTRUCTED_GAME_ERA_WONDER.webp" },
  MOMENT_UNIT_CREATED_FIRST_UNIQUE: { label: "Hemos entrenado a nuestra Unidad Única por primera vez.", icon: "MOMENT_UNIT_CREATED_FIRST_UNIQUE.webp" },
  MOMENT_PROJECT_FOUNDED_SATELLITE_LAUNCH_FIRST_IN_WORLD: { label: "¡Primer satélite lanzado al espacio en el mundo!", icon: "MOMENT_PROJECT_FOUNDED_SATELLITE_LAUNCH_FIRST_IN_WORLD.webp" },

  // --- DIPLOMACIA Y POLÍTICA ---
  MOMENT_DEAL_MADE_FIRST_IN_WORLD: { label: "¡Primer acuerdo diplomático firmado en el mundo!", icon: "MOMENT_DEAL_MADE_FIRST_IN_WORLD.webp" },
  MOMENT_ALLIANCE_FORMED_FIRST_IN_WORLD: { label: "¡Primera alianza formada en el mundo!", icon: "MOMENT_ALLIANCE_FORMED_FIRST_IN_WORLD.webp" },
  MOMENT_DEAL_BROKEN: { label: "Un acuerdo diplomático ha sido roto.", icon: "MOMENT_DEAL_BROKEN.webp" },
  MOMENT_GOVERNOR_ALL_APPOINTED_FIRST: { label: "¡Nuestro gobernador ha sido el primero en ser nombrado en el mundo!", icon: "MOMENT_GOVERNOR_ALL_APPOINTED_FIRST.webp" },
};

const governorNames = ["Victor", "Amani", "Magnus", "Liang", "Pingala", "Moksha", "Reyna"];

export const translateEvent = (moment: Moment) => {
  const eventType = moment.Type;
  let translation = eventDictionary[eventType];
  
  if (eventType === "MOMENT_GOVERNOR_FULLY_PROMOTED_FIRST" || eventType === "MOMENT_GOVERNOR_FULLY_PROMOTED") {
    // Buscar el nombre del gobernador en la descripción
    const governor = governorNames.find(g => moment.InstanceDescription?.includes(g));
    if (governor) {
      return {
        label: `Primer gobernador completamente promovido (${governor})`,
        icon: `MOMENT_GOVERNOR_FULLY_PROMOTED_FIRST_${governor}.webp`
      };
    }
  }

  if (translation) return translation;

  return {
    label: eventType.replace("MOMENT_", "").replace(/_/g, " ").toLowerCase(),
    icon: eventType + ".webp", 
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