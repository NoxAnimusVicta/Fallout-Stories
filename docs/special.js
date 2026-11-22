// SPECIAL is a presentation scale; the established EotE engine retains its ratings.
export const SPECIAL=[
  {key:'Brawn',name:'Strength',description:'Physical power, lifting, unarmed force and weapon damage.'},
  {key:'Cunning',name:'Perception',description:'Awareness, reading a situation and surviving the wasteland.'},
  {key:'Willpower',name:'Endurance',description:'Resolve under pressure, discipline and resistance to strain.'},
  {key:'Presence',name:'Charisma',description:'Social confidence, persuasion, leadership and composure.'},
  {key:'Intellect',name:'Intelligence',description:'Reasoning, technical knowledge, medicine and repairs.'},
  {key:'Agility',name:'Agility',description:'Coordination, stealth, shooting and Blade Technique accuracy.'},
  {key:'Luck',name:'Luck',description:'Fortune in a tight spot. Every two points provide one Destiny Point.'}
];
export const specialScore=rating=>rating*2;
export const specialName=key=>SPECIAL.find(s=>s.key===key)?.name||key;
// Brief rank labels used by Ronin, from New Vegas's Vigor Tester.
// https://fallout.fandom.com/wiki/Fallout%3A_New_Vegas_SPECIAL
const vegas={Brawn:{4:'Lightweight'},Cunning:{4:'Unsuspecting Trout'},Willpower:{6:'Hardy'},Presence:{4:'Peevish Librarian'},Intellect:{4:'Knuckle Head'},Agility:{4:'Butterfingers',5:'Under Control',6:'Catlike'},Luck:{2:'Broken Gypsy Mirror'}};
const levels=['Absent','Extremely Low','Very Low','Low','Modest','Average','Capable','Strong','Exceptional','Extraordinary','Outstanding','Legendary','Peak'];
export function specialDescriptor(key,score){return vegas[key]?.[score]||levels[score]||'Beyond the Ordinary';}
