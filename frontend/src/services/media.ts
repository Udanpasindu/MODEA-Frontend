export function newestMediaUrl(url:string|undefined,version?:string):string{
  if(!url)return '';
  if(!version||url.startsWith('data:')||url.startsWith('blob:'))return url;
  const separator=url.includes('?')?'&':'?';
  return `${url}${separator}modea_v=${encodeURIComponent(version)}`;
}
