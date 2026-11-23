import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateCharacter,fireWeapon,reloadWeapon} from '../docs/rules.js';
import {talentColumns} from '../docs/class-reference.js';
const load=async()=>JSON.parse(await readFile(new URL('../docs/character.json',import.meta.url),'utf8'));

test('session close preserves XP accounting and one award without purchases',async()=>{
 const {character:c}=await load();validateCharacter(c);
 assert.equal(c.session.status,'ended');assert.equal(c.session.number,1);
 assert.equal(c.session.startingXp,110);assert.equal(c.xpLedger.length,1);
 assert.equal(c.xpLedger.reduce((n,e)=>n+e.amount,0),10);
 assert.equal(c.totalXp,c.session.startingXp+c.session.earnedXp);
 assert.equal(c.totalXp-c.session.spentXp,c.xp);assert.equal(c.xp,10);
 let talentCost=0;const ranks={};const nodes=new Set(c.acquiredTalentNodes);
 for(const node of nodes){const col='ABCD'.indexOf(node[0]),row=Number(node[1])-1;assert.ok(col>=0&&row>=0&&row<5);if(row)assert.ok(nodes.has(node[0]+row));talentCost+=(row+1)*5;const name=talentColumns[col][row].name;ranks[name]=(ranks[name]||0)+1;}
 assert.equal(talentCost,50);assert.equal(talentCost+60,c.session.spentXp);
 for(const t of c.talents)assert.equal(ranks[t.name],t.rank);
 assert.equal(ranks.Dodge,undefined);
});

test('recovered ammunition is conserved through valid firearm operations',async()=>{
 const {character:c}=await load();assert.equal(c.caps,45);
 const rifle=c.weapons.find(w=>w.id==='loot-p018-rifle');const pistol=c.weapons.find(w=>w.id==='loot-p018-pistol');
 assert.deepEqual([rifle.loaded,c.ammo[rifle.ammo],pistol.loaded,c.ammo[pistol.ammo]],[3,5,6,6]);
 for(const w of [rifle,pistol]){const before=w.loaded+c.ammo[w.ammo];assert.equal(w.cost,1);fireWeapon(c,w.id);reloadWeapon(c,w.id);assert.equal(w.loaded+c.ammo[w.ammo],before-1);}
 assert.equal(c.inventory.length,1);assert.equal(c.power.owned,false);
 assert.equal(c.inventory.some(i=>/letter|knife|water|tobacco|match/i.test(i.name)),false);
});

test('recorded recovery is applied once without session-end or reload refresh',async()=>{
 const {character:c}=await load();assert.equal(c.recoveryLog.length,1);
 const r=c.recoveryLog[0];assert.equal(r.before-r.recovered,r.after);assert.equal(r.after,c.strain);
 assert.equal(c.strain,3);assert.equal(c.wounds,0);assert.equal(c.criticalInjuries,'');
 assert.equal(c.destinyRemaining,1);assert.equal(c.rads,0);
 assert.deepEqual((await load()).character,c);
 assert.equal(c.journal.filter(j=>j.id==='session-01').length,1);
});

test('public runtime has no edit/import handlers or private campaign payloads',async()=>{
 const app=await readFile(new URL('../docs/app.js',import.meta.url),'utf8');
 for(const term of ['editCharacter','editSkills','editTalent','luck-player','luck-gm','localStorage','setItem(','Fire ('])assert.equal(app.includes(term),false,term);
 const record=await load();assert.deepEqual(Object.keys(record).sort(),['character','release','version']);
 for(const term of ['Face-Masher','mara-velez','ada-mercer','private/current-checkpoint','narrator','baby','breeding'])assert.equal(JSON.stringify(record).includes(term),false,term);
 assert.equal(record.release,'ronin-2.1.0');
});
