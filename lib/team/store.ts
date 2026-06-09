import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { TeamData } from "@/lib/team/types";

const dataFile = path.join(process.cwd(), "data", "team.json");

export async function readTeamData(): Promise<TeamData> {
  try {
    const raw = await readFile(dataFile, "utf-8");
    return JSON.parse(raw) as TeamData;
  } catch {
    return { members: [] };
  }
}

export async function writeTeamData(data: TeamData) {
  await writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
}
