import {useEffect,useState} from 'react';
import {newestMediaUrl} from '../services/media';

type Props={type?:'image'|'video';imageUrl?:string;videoUrl?:string;version?:string;alt:string;className?:string;priority?:boolean};

export function StorefrontMedia({type='image',imageUrl,videoUrl,version,alt,className='',priority=false}:Props){
  const source=newestMediaUrl(type==='video'&&videoUrl?videoUrl:imageUrl,version);
  const [ready,setReady]=useState(false);
  useEffect(()=>setReady(false),[source,type]);
  if(!source)return <div className={`media-placeholder ${className}`} aria-label={alt}/>;
  if(type==='video'&&videoUrl)return <div className={`fresh-media ${ready?'is-ready':''} ${className}`}><video key={source} src={source} autoPlay muted loop playsInline preload="auto" onCanPlay={()=>setReady(true)} aria-label={alt}/></div>;
  return <div className={`fresh-media ${ready?'is-ready':''} ${className}`}><img key={source} src={source} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} onLoad={()=>setReady(true)}/></div>;
}
