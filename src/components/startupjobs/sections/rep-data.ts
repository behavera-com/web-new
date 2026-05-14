import type { Rep } from "./RepCard";

export const jana: Rep = {
  name: "Jana",
  title: "Konzultantka · Behavera",
  email: "hello@behavera.com",
  phone: "+420 605 839 456",
  photo: "/startupjobs/team/Jana.png",
};

export const veronika: Rep = {
  name: "Veronika",
  title: "HR konzultantka · Behavera",
  email: "hello@behavera.com",
  photo: "/startupjobs/team/Veronika.jpg",
};

export const consultReps: Rep[] = [jana, veronika];

// Primary rep for single-rep contexts (floating CTA, header)
export const consultRep: Rep = jana;
