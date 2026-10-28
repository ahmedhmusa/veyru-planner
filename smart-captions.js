export function suggest({scene='',topic='',detail='',hook='',tone='Exciting',method='',outcome=''}){
 const visual=scene.trim().replace(/[.!?]+$/,'');
 const subject=topic.trim()||'Fishing';
 const truth=detail.trim();
 const sentence=s=>s? s.replace(/^[a-z]/,c=>c.toUpperCase()).replace(/[.!?]+$/,'')+'.':'';
 const shortVisual=visual.length>90?visual.slice(0,87).replace(/\s+\S*$/,'')+'…':visual;
 const focus=shortVisual||subject;
 const lead=hook.trim()||({Exciting:`${subject}: ${focus}`,Educational:`A closer look: ${focus}`,Cinematic:`On the water | ${focus}`,Storytelling:`Behind this fishing moment: ${focus}`}[tone]||focus);
 const unique=[...new Set([lead,`${subject} | ${focus}`,`Fishing up close: ${focus}`,`From the fishing trip: ${focus}`,`${focus} — VeyruKeyolhu`])];
 const titles=unique.map(t=>t.slice(0,100));
 const facts=[sentence(visual),truth].filter(Boolean).join('\n\n');
 const content=facts||`${subject}: a fishing video from VeyruKeyolhu.`;
 const speciesTags=[['giant trevally','GT','GTFishing'],['yellowfin','tuna','TunaFishing'],['triggerfish','triggerfish','Triggerfish'],['grouper','grouper','GrouperFishing'],['snapper','snapper','SnapperFishing']].filter(([a,b])=>subject.toLowerCase().includes(a)||subject.toLowerCase().split(/\W+/).includes(b.toLowerCase())).map(x=>'#'+x[2]);
 const tags=['#Fishing','#VeyruKeyolhu',...speciesTags].join(' ');
 const ideas=[{name:'Fishing story',body:`${content}\n\nWatch the fishing video for the story behind this frame. What would you like to know about this trip?`},{name:'Angler conversation',body:`${content}\n\nAnglers: what stands out to you in this frame? Share your observations or questions below.`},{name:'Fishing details',body:`${content}\n\nHave a question about the fish, tackle or technique shown? Leave it below for a future fishing video.`}];
 return {titles,ideas,visual,platforms:[{platform:'YouTube',title:titles[0],body:ideas[0].body+'\n\nFollow VeyruKeyolhu for more fishing videos.\n\n'+tags},{platform:'Instagram',title:titles[1]||titles[0],body:content+'\n\nOne fishing frame, plenty to talk about. What caught your eye?\n\n'+tags},{platform:'TikTok',title:hook.trim()||titles[0],body:content+'\n\nAnglers, what did you notice first?\n\n'+tags}]};
}
