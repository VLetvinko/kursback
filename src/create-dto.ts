export interface CreateUser{
  id: number;
  username: string;
  email: string;
  password: string;
}
export interface CreatePost {
  id: number;
  nameRecipe: string;
  ingredients: string;
  author: string;
  preparation: string;
  time: string;
  titleImage: string;
  hardLevel: string;
}

