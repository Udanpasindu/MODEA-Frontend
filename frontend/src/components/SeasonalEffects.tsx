import {useMemo} from 'react';

export type SeasonalEffectType='snow'|'vesak'|'vaisakhi'|'new-year'|'sinhala-tamil-new-year'|'halloween'|'valentine'|'none';

const symbols:Record<Exclude<SeasonalEffectType,'none'>,string[]>={
  snow:['❄','❅','❆'],
  vesak:['🏮','✦','✧'],
  vaisakhi:['🌾','☀','✦'],
  'new-year':['✦','★','●'],
  'sinhala-tamil-new-year':['🌞','🌾','✿'],
  halloween:['🎃','🦇','👻'],
  valentine:['♥','♡','❤'],
};

export function SeasonalEffects({effect}:{effect?:{enabled:boolean;type:SeasonalEffectType;intensity:number}}){
  const particles=useMemo(()=>{
    if(!effect?.enabled||effect.type==='none')return [];
    const count=effect.intensity*12;
    return Array.from({length:count},(_,i)=>({
      symbol:symbols[effect.type as Exclude<SeasonalEffectType,'none'>][i%3],
      left:(i*37)%100,
      delay:-((i*1.7)%12),
      duration:8+(i%7),
      size:14+(i%5)*4,
    }));
  },[effect?.enabled,effect?.type,effect?.intensity]);
  if(!particles.length)return null;
  return <div className={`seasonal-effects effect-${effect!.type}`} aria-hidden="true">{particles.map((p,i)=><span key={i} style={{left:`${p.left}%`,animationDelay:`${p.delay}s`,animationDuration:`${p.duration}s`,fontSize:p.size}}>{p.symbol}</span>)}</div>;
}
