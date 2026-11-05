import Link from "next/link";
import Image from "next/image";
import { EditorialHero } from "@/components/editorial-hero";
import { HowIWork } from "@/components/how-i-work";
import { ProofStrip } from "@/components/proof-strip";
import { PostCard } from "@/components/post-card";
import { getFeaturedPosts } from "@/lib/content";
export default function HomePage(){const posts=getFeaturedPosts(3);return <>
<EditorialHero eyebrow="Technology leader / Architect / Builder" title="Turning complex technology into meaningful outcomes." description="I&apos;m Andrew Riley — Riles to most people. I bring a curious, practical perspective to technology decisions, shaped by work across enterprise, cloud, healthcare and engineering." image="/images/hero/andrew_main.jpg" imageAlt="Portrait of Andrew Riley" imagePosition="right center" portrait sectionLinks={[{href:"#how-i-work",label:"How I work"},{href:"#experience",label:"My experience"},{href:"#journal",label:"Journal"},{href:"#beyond-work",label:"Beyond work"},{href:"#connect",label:"Let's connect"}]}/>
<ProofStrip/>

<HowIWork/>
<section id="beyond-work" className="scroll-mt-44 md:scroll-mt-24 mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">More than the work</p><h2 className="mt-4 text-3xl font-bold">Curiosity doesn&apos;t clock off.</h2><p className="mt-5 leading-8 text-text-secondary">Away from the work, you&apos;ll find me mixing music, making things and spending time with family. Music, wellbeing and time to switch off are part of how I stay curious and connected.</p><Link href="/beyond" className="mt-6 inline-block font-semibold text-brand-primary hover:underline">Beyond work →</Link></div><div className="relative aspect-[5/4] overflow-hidden rounded-2xl"><Image src="/images/hero/dj_riles_vegas.jpg" alt="DJ Riles performing" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover"/></div></section>
<section id="journal" className="scroll-mt-44 md:scroll-mt-24 mx-auto max-w-6xl px-5 py-16"><h2 className="text-3xl font-bold">Notes from the workbench.</h2><p className="mt-3 text-text-secondary">Technical walkthroughs and lessons you can take into your own projects.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{posts.map(post=><PostCard key={post.slug} post={post}/>)}</div><Link href="/journal" className="mt-7 inline-block font-semibold text-brand-primary hover:underline">Read the journal →</Link></section>
<section id="connect" className="scroll-mt-44 md:scroll-mt-24 bg-surface-card py-16"><div className="mx-auto max-w-6xl px-5"><h2 className="text-3xl font-bold">Good conversations lead to interesting possibilities.</h2><p className="mt-4 max-w-2xl leading-7 text-text-secondary">Interested in technology, architecture, AI or collaboration? I&apos;d be glad to hear from you.</p><Link href="/connect" className="mt-6 inline-block rounded-xl bg-brand-primary px-5 py-3 font-semibold text-text-inverse">Let&apos;s connect</Link></div></section>
</>}
