import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBBoardProps {
  ctx: WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
