import React from 'react';
import { PageRoute } from '../types';

interface ProjectCaseStudyPageProps {
  base: string;
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

const caseStudies = {
  'pelican-social': {
    number: '01', title: 'Pelican Social', subtitle: 'A Caribbean welcome with a distinct point of view.', category: 'Brand identity · Restaurant', location: 'Simpson Bay, Sint Maarten', logo: 'pelicansociallogo_thumbnail.png', image: 'pelicansocial_thumbnaildesktop.png', links: [['Pelican Social website', 'https://pelicansocialsxm.com/'], ['Maho Group venue page', 'https://mahowineanddine.com/venues/pelican-social']],
    context: 'Pelican Social is a bar and grill in Simpson Bay, Sint Maarten, serving resort visitors and local guests in a destination full of dining choices.',
    challenge: 'The brand needed to communicate a varied, freshly prepared menu and a relaxed Caribbean atmosphere, while giving visitors a memorable name and identity to recognize.',
    response: ['Created a complete logo and brand identity direction around the Pelican Social name.', 'Balanced a polished, welcoming restaurant feel with the client’s boho-chic Caribbean setting.', 'Designed the identity to work across digital touchpoints and on-premise customer materials.'],
    value: 'A distinctive identity gives guests a clearer sense of the experience before they arrive and helps the restaurant stand apart in a busy resort destination.'
  },
  'ikon-trailers': {
    number: '02', title: 'IKON Trailers', subtitle: 'A confident identity built for heavy-duty work.', category: 'Brand identity · Industrial', location: 'San Antonio, Texas, USA', logo: 'ikontrailerslogo_thumbnail.png', image: 'ikontrailers_thumbnailldesktop.png', links: [['IKON Trailers website', 'https://ikontrailers.com/']],
    context: 'IKON Trailers sells heavy-duty trailers in San Antonio, Texas, serving owner-operators as well as large corporate buyers across several trailer categories.',
    challenge: 'The business wanted its identity to express the strength and high standards behind the IKON name, while earning confidence from buyers with very different operating scales.',
    response: ['Developed a logo and brand identity for a heavy-duty trailer dealer.', 'Used a strong, assured visual character suited to an industrial sales environment.', 'Kept the identity focused on the IKON name and the quality of the service it represents.'],
    value: 'A clear, professional identity helps the business present itself consistently to individual operators and enterprise buyers, supporting trust at the start of a considered purchase.'
  },
  'iron-acre': {
    number: '03', title: 'Iron Acre Land Co', subtitle: 'A straightforward identity ready for the field.', category: 'Brand identity · Construction', location: 'United States', logo: 'ironacrelogo_thumbnail.png', image: 'ironacre_thumbnaildesktop.png', links: [['Iron Acre Land Co website', 'https://www.ironacrelandco.com/']],
    context: 'Iron Acre Land Co provides excavation and land management for landowners and homeowners, with work spanning land, equine, and contractor settings.',
    challenge: 'The logo needed to feel tough and uncomplicated, reproduce clearly on trucks, machinery, workwear, and hats, and avoid narrowing the company to only a farm or horse audience.',
    response: ['Built the identity around the full Iron Acre Land Co name.', 'Kept the visual direction simple, strong, and grounded in the client’s black-and-white preference.', 'Designed for practical recognition across vehicles, equipment, clothing, and small-format uses.'],
    value: 'A versatile identity makes it easier for customers and partners to recognize the company wherever the work happens, from a job site to a first conversation.'
  },
  'friends-of-unionville': {
    number: '04', title: 'Friends of Unionville', subtitle: 'A community identity rooted in place and shared purpose.', category: 'Brand identity · Non-profit', location: 'Unionville, Pennsylvania, USA', logo: 'friendsofunionvillelogo_thumbnail.png', image: 'friendsofunionville_desktopthumbnail.png', links: [['Friends of Unionville website', 'https://www.friendsofunionville.org/']],
    context: 'Friends of Unionville is a new non-profit working with residents, local businesses, and stakeholders to steward a historic village and its public spaces.',
    challenge: 'As a new organization, it needed a recognizable identity that could express heritage, connection, walkability, and care for the village’s future without blending into local organizations already using blue.',
    response: ['Created a logo direction for the Friends of Unionville name and “Est. 2025” detail.', 'Explored a mature, sophisticated visual style using greens, reds, and other suitable colors.', 'Connected the identity to the village’s crossroads, historic character, and collaborative mission.'],
    value: 'A clear identity gives the organization a consistent way to introduce its mission, build recognition, and bring community initiatives under one shared banner.'
  },
  'sound-curves': {
    number: '05', title: 'SoundCurves', subtitle: 'Making a premium product easier to understand and want.', category: 'Website design · Consumer technology', location: 'Client location not specified', logo: 'soundcurveslogo_thumbnail.png', image: 'soundcurves_thumbnaildesktop.png', links: [['SoundCurves website', 'http://www.soundcurves.com']],
    context: 'SoundCurves sells premium earphones priced at $799 to two groups: experienced audio enthusiasts and people who have not yet tried premium audio.',
    challenge: 'The website needed to serve both audiences: give knowledgeable buyers the product and technology detail they expect, while helping newcomers understand why the listening experience merits the investment.',
    response: ['Planned a five-page experience covering the home, product, technology, and two campaign landing pages.', 'Organized navigation and page content around product discovery, education, and clear next steps.', 'Designed desktop and mobile layouts to support both comparison-minded visitors and first-time premium buyers.'],
    value: 'A well-structured product experience can make a high-consideration offer easier to evaluate, explain product value clearly, and guide interested visitors toward a purchase decision.'
  },
  'moods-and-nerds': {
    number: '06', title: 'Moods N Meds', subtitle: 'A calm interface for sensitive, personal information.', category: 'Website design · Digital wellness', location: 'Client location not specified', logo: 'moodnnerdslogo_thumbnail.png', image: 'moodnmeds_thumbnaildesktop.png', links: [],
    context: 'Moods N Meds is a digital wellness concept for people experiencing anxiety, combining calming content with tools for daily mood logging and medication reviews.',
    challenge: 'The experience needed to feel vibrant yet calm and make several tasks easy to understand: finding relief resources, recording a daily mood, viewing past logs, writing medication reviews, and creating an account.',
    response: ['Designed a consistent visual direction across five pages: home, daily log, results, reviews, and sign-up.', 'Used a calm visual atmosphere informed by the client’s interest in nature and Japanese garden references.', 'Structured the key actions and information so users can understand what each page is for.'],
    value: 'A thoughtful interface helps the service communicate its purpose and makes its tools easier to navigate. It supports the product experience without promising a medical outcome.'
  },
  'green-essential': {
    number: '07', title: 'Green Essentials', subtitle: 'Bringing two outdoor services together in one identity.', category: 'Logo design · Home services', location: 'Loganville, Georgia, USA', logo: 'greenessentiallogo_thumbnail.png', image: 'greenessential_thumbnaildesktop.png', links: [['Green Essentials website', 'https://www.greenessentials.info/'], ['Green Essentials profile', 'https://www.alignable.com/loganville-ga/green-essentials-lawn-service']],
    context: 'Green Essentials offers lawn fertilization, weed control, and mosquito treatments to people who want a healthier lawn and a more comfortable yard.',
    challenge: 'The logo needed to make two related services—lawn care and mosquito control—clear to homeowners at a glance.',
    response: ['Developed a logo direction for the Green Essentials name.', 'Brought the lawn and mosquito service cues together in one visual identity.', 'Explored a blue-and-green palette suited to the environmental and outdoor service category.'],
    value: 'Clear service cues can help homeowners quickly understand what the business offers and remember it when they are ready to improve their outdoor space.'
  },
  'lewis-park': {
    number: '08', title: 'Lewis Park Pickleball', subtitle: 'A wearable mark for a neighborhood that plays together.', category: 'Apparel design · Community', location: 'Sacramento, California, USA', logo: 'lewisparklogo_thumbnail.png', image: 'lewispark_thumbnaildesktop.png', links: [],
    context: 'A diverse group of adults plays pickleball regularly at Lewis Park in Sacramento, California, bringing neighbors together for friendship and exercise.',
    challenge: 'The shirt graphic needed to appeal across genders and ages, read clearly in group photos, and give Lewis Park greater prominence than the city line.',
    response: ['Created a two-color design for navy shirts using white and neon green.', 'Made “Lewis Park” the primary message, with “Sacramento, California” in a supporting role.', 'Designed the graphic for easy reading and a shared sense of group identity.'],
    value: 'A recognizable group shirt helps participants feel connected and makes the park community easier to identify in photos and at local events.'
  }
} as const;

export function ProjectCaseStudyPage({ base, slug, onNavigate }: ProjectCaseStudyPageProps) {
  const project = caseStudies[slug as keyof typeof caseStudies];
  const projectOrder = Object.entries(caseStudies);
  const currentIndex = projectOrder.findIndex(([projectSlug]) => projectSlug === slug);
  const [previousSlug, previousProject] = projectOrder[(currentIndex - 1 + projectOrder.length) % projectOrder.length];
  const [nextSlug, nextProject] = projectOrder[(currentIndex + 1) % projectOrder.length];

  if (!project) {
    return (
      <main className="px-5 md:px-8 pt-40 pb-24 min-h-[60vh]">
        <div className="max-w-[1000px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-5">Project not found</p>
          <h1 className="font-display font-extrabold uppercase tracking-tighter text-5xl sm:text-7xl">Let’s find the right work.</h1>
          <button onClick={() => onNavigate('work')} className="mt-8 rounded-full bg-neon px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">Back to selected work ↗</button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-hidden">
      <section className="px-5 md:px-8 pt-32 sm:pt-40 md:pt-48 pb-10 sm:pb-14">
        <div className="max-w-[1400px] mx-auto">
          <button onClick={() => onNavigate('work')} className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/55 hover:text-accent-ink transition-colors">← All projects</button>
          <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-4">{project.number} / {project.category}</p>
              <h1 className="font-display font-extrabold uppercase tracking-tighter leading-[0.88] text-[clamp(3rem,10vw,9rem)]">{project.title}<span className="text-accent-ink">.</span></h1>
              <p className="mt-5 font-sans text-xl sm:text-2xl text-ink/70 leading-snug max-w-3xl">{project.subtitle}</p>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-3">Project focus</p>
              <p className="font-sans text-sm sm:text-base text-ink/70 leading-relaxed">Business challenge, creative response, and the value the work is designed to support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-12 sm:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="aspect-[2/1] w-full rounded-2xl border border-dashed border-ink/25 bg-[radial-gradient(ellipse_at_center,rgba(217,253,23,0.08),transparent_65%)] grid place-items-center overflow-hidden p-6 sm:p-10 md:p-14 text-center transition-colors duration-500 hover:border-neon/70">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">Main project image / logo</span>
              <p className="mt-2 font-display uppercase text-xl sm:text-2xl">2400 × 1200 px</p>
              <p className="mt-2 font-sans text-xs text-ink/45">2:1 · JPG or WebP · full width</p>
            </div>
          </div>
          <aside className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink">Client</p><h2 className="mt-3 font-display uppercase font-bold text-2xl sm:text-3xl">{project.title}</h2><p className="mt-3 font-sans text-sm text-ink/60">{project.location}</p></div>
            <div className="flex flex-wrap items-start gap-3">{project.links.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-ink hover:text-white transition-colors break-all">{label} ↗</a>)}</div>
          </aside>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-16 sm:pb-24">
        <div className="max-w-[1400px] mx-auto rounded-2xl bg-neon text-black p-6 sm:p-10 md:p-14 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/60 mb-3">Project scope</p><h2 className="font-display uppercase font-extrabold tracking-tight text-3xl sm:text-4xl">What the client needed</h2></div>
          <div className="md:col-span-8"><p className="font-sans text-lg sm:text-xl leading-relaxed">{project.challenge}</p><p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">{project.category}</p></div>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-16 sm:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between gap-6 mb-7">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">Project imagery</p><h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl">The work in detail</h2></div>
            <p className="hidden sm:block font-mono text-[10px] uppercase tracking-wider text-ink/40">Image sizes shown at 2× export resolution</p>
          </div>
          <div className="grid md:grid-cols-12 gap-4 sm:gap-5">
            <div className="md:col-span-7 aspect-[16/10] rounded-2xl border border-dashed border-ink/25 bg-white/[0.025] grid place-items-center text-center p-6 transition-colors duration-500 hover:border-neon/70 hover:bg-neon/[0.035]"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">01 / Featured visual</span><p className="mt-2 font-display uppercase text-xl sm:text-2xl">1920 × 1200 px</p><p className="mt-2 font-sans text-xs text-ink/45">16:10 · JPG or WebP</p></div></div>
            <div className="md:col-span-5 aspect-[4/5] rounded-2xl border border-dashed border-ink/25 bg-white/[0.025] grid place-items-center text-center p-6 transition-colors duration-500 hover:border-neon/70 hover:bg-neon/[0.035]"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">02 / Detail or mobile view</span><p className="mt-2 font-display uppercase text-xl sm:text-2xl">1200 × 1500 px</p><p className="mt-2 font-sans text-xs text-ink/45">4:5 · JPG or WebP</p></div></div>
            <div className="md:col-span-12 aspect-[2/1] rounded-2xl border border-dashed border-ink/25 bg-white/[0.025] grid place-items-center text-center p-6 transition-colors duration-500 hover:border-neon/70 hover:bg-neon/[0.035]"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">03 / Wide application or process image</span><p className="mt-2 font-display uppercase text-xl sm:text-2xl">2400 × 1200 px</p><p className="mt-2 font-sans text-xs text-ink/45">2:1 · JPG or WebP</p></div></div>
          </div>
          <p className="mt-4 font-sans text-xs text-ink/45">These are recommended export sizes. Place your finished files in <code className="text-accent-ink">public/images/case-studies/</code>; we can connect them after you choose the final images.</p>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-4">The business</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.95]">Context &amp; challenge</h2>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h3 className="font-display uppercase tracking-tight text-lg sm:text-xl mb-2">The context</h3>
              <p className="font-sans text-base sm:text-lg text-ink/70 leading-relaxed">{project.context}</p>
            </div>
            <div>
              <h3 className="font-display uppercase tracking-tight text-lg sm:text-xl mb-2">The challenge</h3>
              <p className="font-sans text-base sm:text-lg text-ink/70 leading-relaxed">{project.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-16 sm:py-24 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/60 mb-4">The response</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.95]">Design with a job to do.</h2>
          </div>
          <ul className="lg:col-span-8 divide-y divide-black/20 border-y border-black/20">
            {project.response.map((item, index) => (
              <li key={item} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-3 py-5 sm:py-6">
                <span className="font-display font-extrabold text-2xl sm:text-3xl">0{index + 1}</span>
                <p className="font-sans text-base sm:text-lg leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.links.length > 0 && <section className="px-5 md:px-8 py-12 sm:py-16 border-y border-ink/10"><div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6"><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2">Explore the business</p><h2 className="font-display font-extrabold uppercase tracking-tighter text-2xl sm:text-3xl">Project links</h2></div><div className="flex flex-wrap gap-3">{project.links.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] hover:border-neon hover:text-accent-ink transition-all duration-300 hover:-translate-y-0.5">{label} ↗</a>)}</div></div></section>}

      <section className="px-5 md:px-8 py-16 sm:py-24 md:py-28">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-4">Business value</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.95]">Built to support the next step.</h2>
          </div>
          <p className="lg:col-span-8 font-sans text-xl sm:text-2xl md:text-3xl text-ink/75 leading-relaxed">{project.value}</p>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-24 sm:pb-32">
        <div className="max-w-[1400px] mx-auto border-t border-ink/15 pt-8 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2">Have a similar challenge?</p>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl">Let’s talk about it.</h2>
          </div>
          <button onClick={() => onNavigate('contact')} className="rounded-full bg-neon px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black hover:scale-[1.03] transition-transform">Discuss your project ↗</button>
        </div>
      </section>

      <nav aria-label="Case study navigation" className="px-5 md:px-8 pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto grid sm:grid-cols-2 gap-4">
          <a href={`#/case-study/${previousSlug}`} className="group rounded-2xl border border-ink/15 p-6 sm:p-8 hover:border-neon/60 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">← Previous project</span>
            <span className="mt-3 block font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl group-hover:text-accent-ink transition-colors">{previousProject.title}</span>
          </a>
          <a href={`#/case-study/${nextSlug}`} className="group rounded-2xl border border-ink/15 p-6 sm:p-8 text-left sm:text-right hover:border-neon/60 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">Next project →</span>
            <span className="mt-3 block font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl group-hover:text-accent-ink transition-colors">{nextProject.title}</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
