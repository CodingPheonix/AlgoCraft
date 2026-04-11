export type UserRole = "user" | 'professor' | 'admin' | 'super_admin'

export type Difficulty = "Easy" | "Normal" | "Hard"

export type User = {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    dateJoined: Date
}

export type heading = {
  id: string;
  type: string;
  content: string;
}

export type subHeading = {
  id: string;
  type: string;
  content: string;
}

export type paragraph = {
  id: string;
  type: string;
  content: string;
}

type code = {
  lang: string;
  code: string;
}

type codeBlock = {
  id: string;
  type: string;
  languages: code[];
}

export type highlight = {
  id: string;
  type: string;
  content: string;
}

export type Mixed = heading | subHeading | paragraph | codeBlock | highlight | null;

export type SubTopic = {
  id: string;
  name: string;
  description?: string;
  difficulty: "Easy" | "Normal" | "Hard";
  external_video?: string;
}