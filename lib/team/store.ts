import { readJsonFromR2, writeJsonToR2 } from "@/lib/gallery/r2";
import type { TeamData } from "@/lib/team/types";

const KEY = "data/team.json";

export async function readTeamData(): Promise<TeamData> {
  return readJsonFromR2<TeamData>(KEY, { members: [] });
}

export async function writeTeamData(data: TeamData): Promise<void> {
  await writeJsonToR2(KEY, data);
}
