import { trigger, style, animate, transition } from '@angular/animations';

export const fadeIn = trigger("fadeIn", [
  transition(":enter", [
    style({opacity: "0" }),
    animate('.5s ease-out', style({opacity: 1}))
  ]),
  transition(":leave", [
    style({opacity:"1"}),
    animate('.3s ease-out', style({opacity: 0}))
  ])
]);