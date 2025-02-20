export type Option = {
  value: string;
  label: string;
};

export interface ComboboxSelectProps {
  name: string;
  list: Option[];
  label: string;
}
