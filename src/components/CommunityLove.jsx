import styles from './CommunityLove.module.css'

/* ── X (Twitter) SVG icon ── */
function XIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

/*
  Avatars use unavatar.io — a free public service that fetches X profile
  pictures by username. Falls back to a gradient initial if the image fails.
*/
function Avatar({ handle, name, fallbackGradient, initials }) {
  const username = handle.replace('@', '')
  return (
    <div className={styles.avatarWrap}>
      <img
        className={styles.avatarImg}
        src={`https://unavatar.io/twitter/${username}`}
        alt={name}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.display = 'flex'
        }}
      />
      {/* fallback shown if image fails */}
      <div
        className={styles.avatarFallback}
        style={{ background: fallbackGradient, display: 'none' }}
      >
        {initials}
      </div>
    </div>
  )
}

const TWEETS = [
  {
    name: 'GraiLeth',
    handle: '@graildoteth',
    initials: 'GL',
    gradient: 'linear-gradient(135deg,#ff2d78,#7c3aed)',
    date: 'Aug 30, 2026',
    url: 'https://x.com/graildoteth',
    body: (
      <>
        My favorite project on RH <strong className={styles.mention}>@Hookrfun</strong> is crushing it. Happy ATH day for the project.
        <br /><br />
        <strong className={styles.mention}>@Hookrfun</strong> leveraged LP pool hooks bring something very unique to the table. Expecting this to only be the first of many unique and novel innovations brought to DeFi.
        <br /><br />
        DeFi will never be the same ONCE these hooks start to be used at scale.
      </>
    ),
  },
  {
    name: 'niko',
    handle: '@saintniko',
    initials: 'NK',
    gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
    date: 'Sep 4, 2026',
    url: 'https://x.com/saintniko',
    body: 'we love Hookr',
  },
  {
    name: 'Uniswap',
    handle: '@Uniswap',
    initials: 'UNI',
    gradient: 'linear-gradient(135deg,#a78bfa,#f472b6)',
    date: 'Sep 17, 2026',
    url: 'https://x.com/Uniswap',
    body: (
      <>
        <strong className={styles.mention}>@Hookrfun</strong>{' '}
        <strong className={styles.mention}>@whatthehookv4</strong> *Hooks mentioned*
      </>
    ),
  },
  {
    name: 'What The Hook',
    handle: '@whatthehookv4',
    initials: 'WH',
    gradient: 'linear-gradient(135deg,#f97316,#ef4444)',
    date: 'Sep 4, 2026',
    url: 'https://x.com/whatthehookv4',
    body: (
      <>
        Our integration with <strong className={styles.mention}>@Hookrfun</strong> is now live.
        <br /><br />
        Anyone using HOOKR's UI can enable our module and get additional rewards from arbitrage value retention.
        <br /><br />
        Building with <strong className={styles.mention}>@NodarJ</strong> is an absolute banger of an experience.
      </>
    ),
  },
  {
    name: 'VEdu',
    handle: '@yashascore',
    initials: 'VE',
    gradient: 'linear-gradient(135deg,#22c55e,#16a34a)',
    date: 'Sep 4, 2026',
    url: 'https://x.com/yashascore',
    body: (
      <>
        For me the <strong className={styles.mention}>@Hookrfun</strong> bet is that Uniswap v4 turns a pool into a venue with its own rules and that RH chain will need a default place to create, read and reuse those venues.
        <br /><br />
        Hookr is built as that place
      </>
    ),
  },
  {
    name: 'DineroDom',
    handle: '@DineroDom0',
    initials: 'DD',
    gradient: 'linear-gradient(135deg,#eab308,#f97316)',
    date: 'Sep 4, 2026',
    url: 'https://x.com/DineroDom0',
    body: (
      <>
        So <strong className={styles.mention}>@Hookrfun</strong> has just been an absolute partnership powerhouse. Clearly setting itself as the distribution layer for V4 hooks.
      </>
    ),
  },
]

export default function CommunityLove() {
  return (
    <section className={styles.section} id="community">
      <div className="section-label">On X</div>
      <div className={styles.header}>
        <h2 className={styles.heading}>Community Love</h2>
        <a
          className={styles.followLink}
          href="https://x.com/hookrfun"
          target="_blank"
          rel="noreferrer"
        >
          <XIcon size={14} />
          Follow @hookrfun
        </a>
      </div>

      <div className={styles.scroll}>
        {TWEETS.map((t) => (
          <a
            key={t.handle + t.date}
            className={styles.card}
            href={t.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className={styles.user}>
              <Avatar
                handle={t.handle}
                name={t.name}
                fallbackGradient={t.gradient}
                initials={t.initials}
              />
              <div className={styles.userInfo}>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.handle}>{t.handle}</div>
              </div>
              <div className={styles.xBadge}><XIcon size={13} /></div>
            </div>

            <div className={styles.body}>{t.body}</div>

            <div className={styles.footer}>
              <span className={styles.date}>{t.date}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
