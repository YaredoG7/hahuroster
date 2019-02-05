import { trigger, state, style, transition, animate } from '@angular/animations';

export const rotateAnimation = [
  trigger('rotate', [
    state('0', style({ transform: 'rotate(0)' })),
    state('1', style({ transform: 'rotate(-180deg)' })),
    transition('1 => 0', animate('350ms ease-out')),
    transition('0 => 1', animate('350ms ease-out'))
  ])
];

export const slideVerticalToggleAnimation = [
  trigger('slideVerticalToggle', [
    state('1', style({ transform: 'translate(0px, 0px)' })),
    state('0', style({ transform: 'translate(-1000px, 0px)' })),
    transition('1 => 0', animate('350ms ease-in-out')),
    transition('0 => 1', animate('350ms ease-in-out'))
  ]),
  trigger('flyInOut', [
    state('1', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate('350ms ease-in')
    ]),
    transition('* => void', [
      animate('450ms ease-out', style({ transform: 'translateX(-100%)' }))
    ])
  ]),
  trigger('flyUpDown', [
    state('1', style({ transform: 'translateY(0)' })),
    // state('1', style({ transform: 'translateY(0)' })),
    transition('void => *', [
      style({ transform: 'translateY(-100%)' }),
      animate('350ms ease-out')
    ]),
    transition('* => void', [
      style({ transform: 'translateY(100%)' }),
      animate('350ms ease-in')
    ])
  ]),
  trigger('slide', [
    state('1', style({ transform: 'translateY(0)' })),
    // state('1', style({ transform: 'translateY(0)' })),
    transition('void => *', [
      style({ transform: 'translateY(-100%)' }),
      animate('350ms ease-out')
    ]),
    transition('* => void', [
      style({ transform: 'translateY(0)' }),
      animate('350ms ease-in')
    ])
  ]),
  trigger('slideInOut', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state('out', style({
      transform: 'translate3d(100%, 0, 0)'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]),
];
