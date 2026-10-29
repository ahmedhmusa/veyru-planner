const clean=s=>String(s||'').trim().replace(/\s+/g,' ');
const sentence=s=>s? s.replace(/[.!?]+$/,'')+'.':'';
const clip=(s,n)=>s.length<=n?s:s.slice(0,n-1).replace(/\s+\S*$/,'')+'…';
export const TECHNIQUES=['Not specified','Topwater','Popping','Jigging','Trolling','Casting','Shore fishing','Fly fishing','Handline'];
export const EVENTS=['Fishing trip','Surface strike','Fish fight','Landed a fish','Catch and release','Lost the fish','Fish identification','Tackle / technique tip'];
export const VOICES=['Exciting','Educational','Cinematic','Storytelling'];
export function suggest({species='',technique='Not specified',event='Fishing trip',location='',gear='',detail='',tone='Exciting',variation=0}){
 const fish=clean(species)||(['Fishing trip','Tackle / technique tip'].includes(event)?'Fishing':'the fish');const place=clean(location),tackle=clean(gear),notes=clean(detail);
 if(!notes)throw Error('Describe what happens in your fishing video first.');
 if(!EVENTS.includes(event)||!TECHNIQUES.includes(technique)||!VOICES.includes(tone))throw Error('Choose a supported fishing event, technique and voice.');
 const method=technique==='Not specified'?'':technique;const subject=fish==='Fishing'?(method?method+' fishing':'Fishing'):fish;
 const hooks={
 'Fishing trip':[`${subject}${place?' at '+place:''} | On the water`,`A fishing day with ${subject}`,`${subject}: the story from the water`],
 'Surface strike':[`${subject} hits the surface`,`${method?method+' action':'Surface action'} with ${subject}`,`The strike | ${subject}`],
 'Fish fight':[`${subject} on the line`,`The fight is on | ${subject}`,`Staying with the fight | ${subject}`],
 'Landed a fish':[`${subject} landed`,`${subject}: the catch`,`Bringing in ${subject}`],
 'Catch and release':[`${subject}: catch and release`,`Back in the water | ${subject}`,`The release | ${subject}`],
 'Lost the fish':[`${subject}: the one that got away`,`Lost the fish, kept the story`,`Not every fishing story ends with a catch`],
 'Fish identification':[`Meet ${subject}`,`A closer look at ${subject}`,`What fish is this? | ${subject}`],
 'Tackle / technique tip':[(method?method+' fishing':subject==='Fishing'?'Tackle and technique':subject)+': a closer look',`${subject} | Tackle and technique`,`${method||'Fishing'} details worth noticing`]
 }[event];
 const prefixes={Exciting:'',Educational:'A closer look: ',Cinematic:'On the water | ',Storytelling:'The story: '};
 const base=[...hooks];const index=((Number(variation)||0)%3+3)%3;
 const titles=[0,1,2].map(i=>clip((prefixes[tone]+base[(i+index)%3]).replace(/^[a-z]/,c=>c.toUpperCase()),100));
 const body=sentence(notes);
 const facts=[method?'Technique: '+method:'',place?'Location: '+place:'',tackle?'Tackle: '+tackle:''].filter(Boolean).join('\n');
 const questions={ 'Fishing trip':'What would you like to see from the next trip?', 'Surface strike':'What would you throw in these conditions?', 'Fish fight':'What is your approach when the fish takes line?', 'Landed a fish':'What is your most memorable catch?', 'Catch and release':'What do you enjoy most about a release?', 'Lost the fish':'Tell us about the one that got away.', 'Fish identification':'What do you look for when identifying this fish?', 'Tackle / technique tip':'What would you add to this setup?'};
 const question=questions[event];
 const openers={Exciting:[`${titles[0]} 🎣`,`${subject} fishing, up close.`,`${titles[1]} 🎣`],Educational:[`A fishing moment to look at closely.`,`The details behind this fishing video.`,`Fish, tackle and technique — here is the context.`],Cinematic:[`Out on the water${place?' at '+place:''}.`,`A frame from the fishing day.`,`Fishing, one moment at a time.`],Storytelling:[`Here is what happened on this trip.`,`Every fishing trip has its own story.`,`This is the moment from our day on the water.`]};
 const opening=openers[tone][index];
 const tags=['#Fishing','#VeyruKeyolhu'];
 const lower=fish.toLowerCase();if(/giant trevally|\bgt\b/.test(lower))tags.push('#GTFishing');else if(/tuna|yellowfin/.test(lower))tags.push('#TunaFishing');else if(/triggerfish/.test(lower))tags.push('#Triggerfish');else if(/grouper/.test(lower))tags.push('#GrouperFishing');else if(/snapper/.test(lower))tags.push('#SnapperFishing');
 if(method)tags.push('#'+method.replace(/[^a-z]/gi,'')+'Fishing');
 if(/\bmaldives\b/i.test(place))tags.push('#MaldivesFishing');
 const hashtags=[...new Set(tags)].join(' ');
 const ideas=[{name:'The fishing story',body:[body,facts,'Fishing videos from VeyruKeyolhu. '+question].filter(Boolean).join('\n\n')},{name:'The details',body:[`${subject}${method?' · '+method:''}${place?' · '+place:''}`,body,facts,question].filter(Boolean).join('\n\n')},{name:'The conversation',body:[body,question,'Follow VeyruKeyolhu for more fishing stories.'].join('\n\n')}];
 return {titles,ideas,platforms:[{platform:'YouTube',title:titles[0],body:ideas[index].body+'\n\n'+hashtags},{platform:'Instagram',title:titles[1],body:[opening,body,place?'📍 '+place:'',question,hashtags].filter(Boolean).join('\n\n')},{platform:'TikTok',title:titles[2],body:[clip(body,240),question,hashtags].join('\n\n')}]};
}
