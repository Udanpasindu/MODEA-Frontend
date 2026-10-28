import {useState} from 'react';
import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {Plus,Trash2} from 'lucide-react';
import {api} from '../../services/api';
import type {Category} from '../../types';

export function CategoryManager(){
  const qc=useQueryClient();
  const [form,setForm]=useState({name:'',description:''});
  const [message,setMessage]=useState('');
  const {data=[]}=useQuery({queryKey:['admin-categories'],queryFn:()=>api<Category[]>('/admin/categories')});
  const create=useMutation({mutationFn:()=>api<Category>('/admin/categories',{method:'POST',body:JSON.stringify({...form,published:true})}),onSuccess:()=>{setForm({name:'',description:''});setMessage('Category created. You can now add products to it.');qc.invalidateQueries({queryKey:['admin-categories']});qc.invalidateQueries({queryKey:['categories']})},onError:e=>setMessage(e instanceof Error?e.message:'Unable to create category')});
  const remove=useMutation({mutationFn:(id:string)=>api(`/admin/categories/${id}`,{method:'DELETE'}),onSuccess:()=>{setMessage('Category deleted.');qc.invalidateQueries({queryKey:['admin-categories']});qc.invalidateQueries({queryKey:['categories']})},onError:e=>setMessage(e instanceof Error?e.message:'Unable to delete category')});
  return <><div className="admin-head"><div><p>Catalog structure</p><h1>Categories</h1></div></div>{message&&<div className="notice">{message}</div>}<div className="category-admin-grid"><form className="admin-panel category-form" onSubmit={e=>{e.preventDefault();create.mutate()}}><h2>Create category first</h2><p className="settings-help">Example: create “Frocks”, then add “Shein New Flower Design Frock” to that category.</p><label>Category name<input required minLength={2} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Description<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><button className="button dark-button" disabled={create.isPending}><Plus/> Create category</button></form><section className="admin-panel"><h2>Available categories</h2>{data.length?data.map(c=><div className="admin-row" key={c._id}><div><b>{c.name}</b><small>{c.description||c.slug}</small></div><span className={`status ${c.published?'published':''}`}>{c.published?'Published':'Hidden'}</span><button className="category-delete" onClick={()=>{if(confirm(`Delete ${c.name}?`))remove.mutate(c._id)}}><Trash2/> Delete</button></div>):<p>No categories yet. Create one before adding products.</p>}</section></div></>;
}
