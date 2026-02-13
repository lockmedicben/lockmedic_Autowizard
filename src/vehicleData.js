// src/vehicleData.js

// 1. IMPORT BRANDS (Updated to match your new folder name)
import { SUBARU_DATA } from "./autodatabase/subaru";
import { CDJ_DATA } from "./autodatabase/cdj";
import { SAAB_DATA } from "./autodatabase/saab";
import { GM_DATA } from "./autodatabase/gm";
import { FORD_DATA } from "./autodatabase/forddata";
import { BMW_DATA } from "./autodatabase/bmwmini";
import { VOLVO_DATA } from "./autodatabase/volvodata";
import { ROVER_DATA } from "./autodatabase/rover";
import { JAGUAR_DATA } from "./autodatabase/jaguar";
import { AUDI_DATA } from "./autodatabase/audi";
import { VW_DATA } from "./autodatabase/vw";
console.log("FORD DATA LOADED:", FORD_DATA);

// 2. COMBINE THEM
export const RAW_DATA = [
  ...SUBARU_DATA,
  ...FORD_DATA,
  ...CDJ_DATA,
  ...SAAB_DATA,
  ...BMW_DATA,
  ...GM_DATA,
  ...VOLVO_DATA,
  ...ROVER_DATA,
  ...JAGUAR_DATA,
  ...AUDI_DATA,
  ...VW_DATA,
];

// 3. LOGIC ENGINE (Standard Logic)
const expandYears = (start, end) => {
  const years = [];
  const startNum = parseInt(start);
  const endNum = end ? parseInt(end) : new Date().getFullYear() + 1;

  for (let y = startNum; y <= endNum; y++) {
    years.push(y);
  }
  return years;
};

// Process Data for Fast Lookup
export const VEHICLE_DATABASE = {};

RAW_DATA.forEach((row) => {
  const years = expandYears(row["Start Year"], row["End Year"]);

  years.forEach((year) => {
    if (!VEHICLE_DATABASE[year]) VEHICLE_DATABASE[year] = {};
    if (!VEHICLE_DATABASE[year][row.Make])
      VEHICLE_DATABASE[year][row.Make] = {};

    if (!VEHICLE_DATABASE[year][row.Make][row.Model]) {
      VEHICLE_DATABASE[year][row.Make][row.Model] = [];
    }
    VEHICLE_DATABASE[year][row.Make][row.Model].push(row);
  });
});

// Export Helpers
export const getYears = () =>
  Object.keys(VEHICLE_DATABASE).sort((a, b) => b - a);
export const getMakes = (year) =>
  VEHICLE_DATABASE[year] ? Object.keys(VEHICLE_DATABASE[year]).sort() : [];
export const getModels = (year, make) =>
  VEHICLE_DATABASE[year] && VEHICLE_DATABASE[year][make]
    ? Object.keys(VEHICLE_DATABASE[year][make]).sort()
    : [];
export const getVehicleDetails = (year, make, model) =>
  VEHICLE_DATABASE[year] && VEHICLE_DATABASE[year][make]
    ? VEHICLE_DATABASE[year][make][model]
    : [];
