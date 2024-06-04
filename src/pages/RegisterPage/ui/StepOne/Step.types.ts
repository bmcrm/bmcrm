export interface IStep {
  linkTo: string;
  linkInnerText: string;
  linkMainText: string;
}
export interface IStepOneData {
  campName: string;
  campId: string;
  city: string;
  website: string;
  accept: boolean;
}

export interface IStepTwoData {
  firstName: string;
  lastName: string;
  accept: boolean;
  playaName: string;
  email: string;
  password: string;
}
