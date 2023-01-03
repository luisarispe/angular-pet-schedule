export interface Route {
  route?: string;
  name: string;
  icon: string;
  children?: Route[];
}
