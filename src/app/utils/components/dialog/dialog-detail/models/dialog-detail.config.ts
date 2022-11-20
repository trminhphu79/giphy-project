import { GIF } from "@utils/models";

export interface IDialogDetailAction {
  action: any;
  text: string;
  color?: string;
  backgroundColor?: string;
}

export interface IDialogDetailData {
  title: string,
  content: GIF,
  actions: [IDialogDetailAction]
}