export interface Experience {
  role: string
  company?: string
  period?: string
  description?: string
  highlights?: string[]
}

export interface Education {
  title: string
  institution?: string
  period?: string
  description?: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Course {
  title: string
  institution?: string
  period?: string
  credentialUrl?: string
}

export interface Profile {
  name?: string
  title?: string
  introduction?: string
  about?: string[]
  location?: string
  focus?: string
  availability?: string
  experience?: Experience[]
  education?: Education[]
  skills?: SkillGroup[]
  courses?: Course[]
  contact?: { email?: string; phone?: string; linkedin?: string }
}

// Preencha apenas com dados reais. Campos opcionais e listas podem ser omitidos.
export const profile: Profile = {
  name: '',
  title: 'Profissional da indústria',
  introduction: '',
  about: [],
  location: '',
  focus: '',
  availability: '',
  experience: [],
  education: [],
  skills: [],
  courses: [],
  contact: { email: '', phone: '', linkedin: '' },
}
