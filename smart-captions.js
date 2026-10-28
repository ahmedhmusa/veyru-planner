export function suggest({scene='',topic='',detail='',hook='',tone='Exciting'}){
 const subject=topic.trim()||'A moment on the water';
 const visual=scene.trim().replace(/[.!?]+$/,'');
 const truth=detail.trim();
 const opening=hook.trim()||({Exciting:`${subject} — take a closer look`,Educational:`What can you spot? ${subject}`,Cinematic:`On the water: ${subject}`,Storytelling:`The story behind ${subject}`}[tone]||subject);
 const titles=[opening,`A closer look at ${subject}`,`${subject} | VeyruKeyolhu`,`The moment behind this frame`,`${subject}: what would you notice first?`];
 // Image captions are machine observations, not confirmed footage facts.
 const start=truth||`A closer look at ${subject.toLowerCase()}.`;
 const ideas=[{name:'Story first',body:`${start}\n\nIn this video: the moment, the setup, and the details behind the frame.\n\nWhat would you like to see on our next trip?`},{name:'Conversation starter',body:`${start}\n\nWhat catches your eye first? Share your take in the comments.\n\nFollow VeyruKeyolhu for more moments on the water.`},{name:'Behind the frame',body:`${start}\n\nGo behind the thumbnail: the conditions, the choices and the story from the day.\n\nMore fishing stories every Tuesday, Thursday and Sunday.`}];
 const captionBase=truth||`A moment worth a closer look. ${subject}.`;
 const hashtags='#Fishing #VeyruKeyolhu';
 return {titles,ideas,visual,platforms:[{platform:'YouTube',title:titles[0],body:ideas[0].body+'\n\nSubscribe for GT Strike Tuesday, fish discovery Thursday, and Sunday adventures.\n\n'+hashtags},{platform:'Instagram',title:titles[1],body:captionBase+'\n\nOne frame, a whole story. What stands out to you?\n\nSave this for your next fishing inspiration.\n\n'+hashtags+' #OceanLife'},{platform:'TikTok',title:hook.trim()||`${subject} 👀`,body:captionBase+'\n\nWhat did you spot first?\n\n'+hashtags}]};
}
