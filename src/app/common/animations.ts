import { trigger, state, style, transition, animate } from "@angular/animations";

export let fade = trigger('fade',[

    state('void',style({opacity:0})),

    transition(':enter, :leave',[ 
      animate(700)
    ])
])

export let slideIn = trigger('slideIn', [
    transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('700ms 0.3s ease-out', style({transform: 'translateX(0%)'}))
    ])
])