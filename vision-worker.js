let captioner;
self.onmessage=async({data})=>{
 try{
  if(!captioner){
   self.postMessage({status:'progress',message:'Loading the on-device vision engine…'});
   const {pipeline,env}=await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
   env.allowLocalModels=false;env.useBrowserCache=true;env.backends.onnx.wasm.numThreads=1;
   captioner=await pipeline('image-to-text','Xenova/vit-gpt2-image-captioning',{quantized:true,progress_callback:p=>{if(p.status==='progress'&&p.total)self.postMessage({status:'progress',message:`Downloading vision model · ${Math.round(p.progress)}% of ${p.file.split('/').pop()}`});else if(p.status==='ready')self.postMessage({status:'progress',message:'Reading your thumbnail…'})}});
  }
  self.postMessage({status:'progress',message:'Looking at the scene, subjects and composition…'});
  const result=await captioner(data.image,{max_new_tokens:48,num_beams:3});
  const description=result?.[0]?.generated_text?.trim();
  if(!description)throw Error('The image could not be described.');
  self.postMessage({status:'done',description});
 }catch(error){captioner=null;self.postMessage({status:'error',message:'Image analysis could not finish. Check your internet connection and available memory, then try again. You can also describe the image below to create drafts.'})}
};
