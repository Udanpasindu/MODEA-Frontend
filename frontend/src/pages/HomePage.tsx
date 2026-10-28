import {ArrowRight} from 'lucide-react';import {Link} from 'react-router-dom';import {motion} from 'framer-motion';import {useQuery} from '@tanstack/react-query';import {api} from '../services/api';import type {Product} from '../types';import {ProductCard} from '../components/ProductCard';import {StorefrontMedia} from '../components/StorefrontMedia';

type Hero={mediaType:'image'|'video';imageUrl:string;videoUrl:string;eyebrow:string;title:string;copy:string;ctaLabel:string;ctaLink:string};
type StoreSettings={updatedAt?:string;hero?:Hero;campaignTitle?:string;campaignCopy?:string};

export function HomePage(){
 const {data}=useQuery({queryKey:['products','home'],queryFn:()=>api<{items:Product[]}>('/products?featured=true&limit=4')});
 const {data:settings,isLoading}=useQuery({queryKey:['public-settings'],queryFn:()=>api<StoreSettings>('/settings/public')});
 const hero=settings?.hero;
 return <>
  <section className={`hero ${!hero||isLoading?'hero-loading':''}`}>
   {hero&&<StorefrontMedia type={hero.mediaType} imageUrl={hero.imageUrl} videoUrl={hero.videoUrl} version={settings?.updatedAt} alt="MODEA campaign" className="hero-media" priority/>}
   {hero?<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.45}}><p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}</h1><p>{hero.copy}</p><Link className="button light-button" to={hero.ctaLink||'/shop'}>{hero.ctaLabel||'Shop the collection'} <ArrowRight/></Link></motion.div>:<div className="hero-copy-placeholder" aria-hidden="true"/>}
  </section>
  <section className="section"><div className="section-head"><div><p className="eyebrow">Just in</p><h2>New Arrivals</h2></div><Link to="/shop?newArrival=true">View all <ArrowRight/></Link></div><div className="product-grid">{data?.items.map(p=><ProductCard p={p} key={p._id}/>)??[1,2,3,4].map(i=><div className="skeleton" key={i}/>)}</div></section>
  <section className="editorial"><div><p className="eyebrow">The MODEA Woman</p><h2>Presence,<br/><em>without permission.</em></h2></div><div><p>We design for the moment before you enter the room—and the trace you leave behind. Considered cuts, tactile fabrics, and a point of view that is entirely your own.</p><Link to="/about">Discover our story <ArrowRight/></Link></div></section>
  {hero&&<section className="campaign"><StorefrontMedia type={hero.mediaType} imageUrl={hero.imageUrl} videoUrl={hero.videoUrl} version={settings?.updatedAt} alt="MODEA collection" className="campaign-media"/><div><p className="eyebrow">The campaign</p><h2>{settings?.campaignTitle||'The latest edit'}</h2><p>{settings?.campaignCopy||'Discover the newest MODEA campaign.'}</p><Link className="button" to="/collections">Explore the edit</Link></div></section>}
 </>;
}
