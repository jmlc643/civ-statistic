import type { Moment } from "../types/civ";

export const getEraColor = (era: string): string => {
  switch (era) {
    case "ERA_ANCIENT": return "#e76f51";
    case "ERA_CLASSICAL": return "#f4a261";
    case "ERA_MEDIEVAL": return "#e9c46a";
    case "ERA_RENAISSANCE": return "#2a9d8f";
    case "ERA_INDUSTRIAL": return "#264653";
    case "ERA_MODERN": return "#457b9d";
    case "ERA_ATOMIC": return "#1d3557";
    case "ERA_INFORMATION": return "#8338ec";
    case "ERA_FUTURE": return "#3a0ca3";
    default: return "#c0c0c0";
  }
};

const translations: Record<string, string> = {
  MOMENT_BARBARIAN_CAMP_DESTROYED: "Campamento Bárbaro Destruido",
  MOMENT_CITY_FOUNDED: "Ciudad Fundada",
  MOMENT_DEDICATION_TRIGGERED: "Dedicación Activada",
  MOMENT_PANTHEON_FOUNDED: "Panteón Fundado",
  MOMENT_RELIGION_FOUNDED: "Religión Fundada",
  MOMENT_IMPROVEMENT_CONSTRUCTED: "Mejora Construida",
  MOMENT_UNIT_BATTLE_PROMOTED: "Unidad Promovida (Combate)",
  MOMENT_WORLD_WONDER_COMPLETED: "Maravilla del Mundo Completada",
  MOMENT_EMPIRE_WORLD_WONDER_COMPLETED: "Maravilla del Mundo Completada",
  MOMENT_ARTIFACT_EXTRACTED: "Artefacto Extraído",
  MOMENT_BUILDING_CONSTRUCTED: "Edificio Construido",
  MOMENT_ALL_GOVERNORS_RECRUITED: "Todos los Gobernadores Reclutados",
  MOMENT_ALL_GOVERNOR_PROMOTIONS: "Promoción de Gobernador",
  MOMENT_DISTRICT_CONSTRUCTED: "Distrito Construido",
  MOMENT_FIRST_CIRCUMNAVIGATION: "Primera Circunnavegación del Mundo",  
  MOMENT_EMPIRE_DISTRICT_CONSTRUCTED: "Distrito del Imperio Construido",
  MOMENT_CITY_TRANSFERRED: "Ciudad Transferida",
  MOMENT_BATTLE_FOUGHT: "Batalla Librada",
  MOMENT_LEADER_MET: "Líder Encontrado",
  MOMENT_GREAT_PERSON_CREATED: "Gran Personaje Reclutado",
  MOMENT_MAX_LEVEL_GOVERNOR: "Gobernador a Nivel Máximo",
  MOMENT_NATIONAL_PARK_FOUNDED: "Parque Nacional Fundado",
  MOMENT_CITY_STATE_ENVOY: "Primer Enviado a Ciudad-Estado",
  MOMENT_TRADING_POST_CONSTRUCTED: "Puesto Comercial Construido",
  MOMENT_TECH_RESEARCHED: "Tecnología Investigada",
  MOMENT_CIVIC_RESEARCHED: "Principios Cívicos Investigados",
  MOMENT_BARBARIAN_CLAN_DISPERSED: "Clan Bárbaro Dispersado",
  MOMENT_GOVERNMENT_TIER_1: "Gobierno Tier 1",
  MOMENT_GOVERNMENT_TIER_2: "Gobierno Tier 2",
  MOMENT_GOVERNMENT_TIER_3: "Gobierno Tier 3",
  MOMENT_CORPS_FORMED: "Cuerpo de Ejército Formado",
  MOMENT_ARMY_FORMED: "Ejército Formado",
  MOMENT_ARMADA_FORMED: "Armada Formada",
  MOMENT_FLEET_FORMED: "Flota Formada",
  MOMENT_SUZERAIN_CITY_STATE: "Suzerano de Ciudad-Estado",
  MOMENT_SPY_MISSION_SUCCESS: "Misión de Espionaje Exitosa",
  MOMENT_SECRET_SOCIETY_FOUNDED: "Sociedad Secreta Fundada",
  MOMENT_CORPORATION_FOUNDED: "Corporación Fundada",
  MOMENT_HERO_CLAIMED: "Héroe Reclamado"
};

export const translateEvent = (moment: Moment): { label: string; icon: string } => {
  const customRules = [
    {
      condition: (m: Moment) => m.Type === "MOMENT_ALL_GOVERNOR_PROMOTIONS" && m.InstanceDescription.includes("REYNA"),
      label: `Ascenso: Reyna la Financiera`,
      icon: `MOMENT_ALL_GOVERNOR_PROMOTIONS.webp`
    },
    {
      condition: (m: Moment) => m.Type === "MOMENT_ALL_GOVERNOR_PROMOTIONS" && m.InstanceDescription.includes("LIANG"),
      label: `Ascenso: Liang la Agrimensora`,
      icon: `MOMENT_ALL_GOVERNOR_PROMOTIONS.webp`
    },
    {
      condition: (m: Moment) => m.Type === "MOMENT_ALL_GOVERNOR_PROMOTIONS" && m.InstanceDescription.includes("VICTOR"),
      label: `Ascenso: Víctor el Castellano`,
      icon: `MOMENT_ALL_GOVERNOR_PROMOTIONS.webp`
    },
    {
      condition: (m: Moment) => m.Type === "MOMENT_ALL_GOVERNOR_PROMOTIONS" && m.InstanceDescription.includes("MAGNUS"),
      label: `Ascenso: Magnus el Senescal`,
      icon: `MOMENT_ALL_GOVERNOR_PROMOTIONS.webp`
    },
    {
      condition: (m: Moment) => m.Type === "MOMENT_ALL_GOVERNOR_PROMOTIONS" && m.InstanceDescription.includes("MOKSHA"),
      label: `Ascenso: Moksha el Cardenal`,
      icon: `MOMENT_ALL_GOVERNOR_PROMOTIONS.webp`
    },
    {
       condition: (m: Moment) => m.Type === "MOMENT_ALL_GOVERNOR_PROMOTIONS" && m.InstanceDescription.includes("PINGALA"),
       label: `Ascenso: Pingala el Educador`,
       icon: `MOMENT_ALL_GOVERNOR_PROMOTIONS.webp`
    },
    {
      condition: (m: Moment) => m.Type === "MOMENT_ALL_GOVERNOR_PROMOTIONS" && m.InstanceDescription.includes("AMANI"),
      label: `Ascenso: Amani la Emisaria`,
      icon: `MOMENT_ALL_GOVERNOR_PROMOTIONS.webp`
    }
  ];

  for (const rule of customRules) {
     if (rule.condition(moment)) {
         return { label: rule.label, icon: rule.icon };
     }
  }

  const baseTranslation = translations[moment.Type] || moment.Type.replace("MOMENT_", "").replace(/_/g, " ");

  let finalLabel = baseTranslation;
  if (moment.InstanceDescription && 
      (moment.Type.includes("WONDER") || 
       moment.Type.includes("RELIGION") || 
       moment.Type.includes("PANTHEON") ||
       moment.Type.includes("DISTRICT"))) {
    finalLabel += `: ${moment.InstanceDescription}`;
  } else if (moment.InstanceDescription && moment.Type === "MOMENT_CITY_FOUNDED") {
    finalLabel = `Ciudad Fundada: ${moment.InstanceDescription}`;
  }
  
  return {
    label: finalLabel,
    icon: `${moment.Type}.webp`
  };
};
