export type View =
  | 'inicio'
  | 'conversar'
  | 'criar'
  | 'criacoes'
  | 'conta';

export type CreationType =
  | 'ilustracao'
  | 'mascote'
  | 'elemento'
  | 'papelaria'
  | 'cena';

export type ReferenceMode = 'preservar' | 'estilo' | 'editar';

export interface User {
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  author: 'user' | 'meell';
  text: string;
  at: number;
}

export interface Creation {
  id: string;
  title: string;
  type: CreationType;
  prompt: string;
  createdAt: number;
  // image URL placeholder for future integration
  imageUrl?: string;
}
